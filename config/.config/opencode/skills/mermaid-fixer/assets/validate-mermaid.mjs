#!/usr/bin/env node
// Mermaid Fixer — dependency-free heuristic validator.
//
// Scans a file (or stdin) for ```mermaid blocks and reports concrete syntax
// errors with line numbers. Exit 0 = all blocks valid, 1 = at least one error.
//
// Usage:
//   node validate-mermaid.mjs [--json] file1.md [file2.mmd ...]
//   cat file.md | node validate-mermaid.mjs
//
// This is a heuristic check (no mermaid runtime). It catches the common
// breakages; for full validation run mermaid.parse() from @mermaid-js/mermaid.

import { readFileSync } from 'node:fs';

const asJson = process.argv.includes('--json');
const files = process.argv.slice(2).filter((a) => a !== '--json');

function readInput() {
  if (files.length > 0) {
    return files.map((f) => {
      try {
        return { name: f, src: readFileSync(f, 'utf8') };
      } catch (e) {
        return { name: f, src: null, error: e.message };
      }
    });
  }
  // stdin
  let src = '';
  try {
    src = readFileSync(0, 'utf8');
  } catch {
    src = '';
  }
  return [{ name: '<stdin>', src }];
}

function extractBlocks(src) {
  const blocks = [];
  const re = /```mermaid\s*\r?\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const content = m[1];
    const fenceLine = src.slice(0, m.index).split('\n').length; // 1-based line of ```mermaid
    blocks.push({ content, fenceLine });
  }
  return blocks;
}

const TYPE_CHECKS = [
  [/^(flowchart|graph)(\s|$)/, 'flowchart'],
  [/^sequenceDiagram\b/, 'sequence'],
  [/^classDiagram\b/, 'class'],
  [/^stateDiagram/, 'state'],
  [/^erDiagram\b/, 'er'],
  [/^journey\b/, 'journey'],
  [/^gantt\b/, 'gantt'],
  [/^pie\b/, 'pie'],
  [/^gitgraph\b|^gitGraph\b/, 'gitgraph'],
  [/^mindmap\b/, 'mindmap'],
  [/^timeline\b/, 'timeline'],
  [/^quadrantChart\b/, 'quadrant'],
  [/^requirementDiagram\b/, 'requirement'],
  [/^C4\w+/, 'c4'],
  [/^block-beta\b/, 'block'],
  [/^kanban\b/, 'kanban'],
  [/^sankey\b/, 'sankey'],
  [/^xychart-beta\b/, 'xychart'],
];

const DIRECTIVE_RE = /^(classDef|class\s|style\s|linkStyle|click\s|subgraph|direction\s|accTitle|accDescr|init\s|-->\s|-\.->|==>|-\.-\s|\.\.->|---|%%|title\s)/;

function detectType(firstLine) {
  const l = (firstLine || '').trim();
  if (l === '') return 'blank';
  if (l.startsWith('---')) return 'directive';
  for (const [re, t] of TYPE_CHECKS) if (re.test(l)) return t;
  if (DIRECTIVE_RE.test(l)) return 'directive';
  return 'unknown';
}

function checkBalance(content) {
  const errors = [];
  const lines = content.split('\n');
  const opens = new Set(['(', '[', '{']);
  const closes = new Set([')', ']', '}']);
  const match = { ')': '(', ']': '[', '}': '{' };
  let stack = [];
  let quote = null;
  for (let i = 0; i < lines.length; i++) {
    let s = lines[i];
    const cidx = s.indexOf('%%');
    if (cidx >= 0) s = s.slice(0, cidx);
    for (let j = 0; j < s.length; j++) {
      const ch = s[j];
      if (quote) {
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === "'" || ch === '"') {
        quote = ch;
        continue;
      }
      if (opens.has(ch)) stack.push({ ch, line: i + 1 });
      else if (closes.has(ch)) {
        const top = stack.pop();
        if (!top || top.ch !== match[ch]) {
          errors.push({ line: i + 1, msg: `Unbalanced '${ch}' (expected close for '${top ? top.ch : 'none'}')` });
        }
      }
    }
    quote = null; // reset per line (labels rarely span lines)
  }
  while (stack.length) {
    const t = stack.pop();
    errors.push({ line: t.line, msg: `Unclosed '${t.ch}'` });
  }
  return errors;
}

const EDGE_OP_RE = /(-->)|(--\s)|(-\.->)|(==>)|(\.\.->)/;
function checkEdges(content, type) {
  if (!['flowchart', 'state', 'class', 'er', 'sequence'].includes(type)) return [];
  const errors = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l === '') continue;
    if (/^(-->|---|-\.->|==>|\.\.->)\s*\S/.test(l)) {
      errors.push({ line: i + 1, msg: 'Edge operator with no left-hand node' });
    }
    if (/(-->|---|-\.->|==>|\.\.->)\s*$/.test(l) && EDGE_OP_RE.test(l)) {
      errors.push({ line: i + 1, msg: 'Edge operator with no right-hand node' });
    }
  }
  return errors;
}

function isRawMermaid(name) {
  return /\.(mmd|mermaid)$/i.test(name);
}

function validateOne(name, src) {
  if (src === null) return { file: name, error: 'read failed', blocks: [] };
  let blocks = extractBlocks(src);
  if (blocks.length === 0) {
    // No fenced ```mermaid blocks. For raw .mmd/.mermaid files (and stdin),
    // treat the whole content as a single Mermaid block.
    if (isRawMermaid(name) || name === '<stdin>') {
      blocks = [{ content: src, fenceLine: 0 }];
    }
  }
  const outBlocks = [];
  for (let bi = 0; bi < blocks.length; bi++) {
    const { content, fenceLine } = blocks[bi];
    const lines = content.split('\n');
    const firstNonEmpty = lines.find((l) => l.trim() !== '') || '';
    const firstIdx = lines.indexOf(firstNonEmpty);
    const type = detectType(firstNonEmpty);
    const errors = [];
    if (type === 'unknown') {
      errors.push({
        line: fenceLine + (firstIdx >= 0 ? firstIdx + 1 : 1),
        msg: `Unrecognized Mermaid diagram type: "${firstNonEmpty.trim()}"`,
      });
    }
    for (const e of checkBalance(content)) errors.push({ line: fenceLine + e.line, msg: e.msg });
    for (const e of checkEdges(content, type)) errors.push({ line: fenceLine + e.line, msg: e.msg });
    outBlocks.push({ index: bi, type: type === 'blank' ? 'empty' : type, ok: errors.length === 0, errors });
  }
  return { file: name, blocks: outBlocks };
}

// ---- run ----
const inputs = readInput();
const report = { files: [] };
let totalErrors = 0;
let totalBlocks = 0;

for (const inp of inputs) {
  const r = validateOne(inp.name, inp.src);
  if (r.error) {
    report.files.push(r);
    if (!asJson) console.log(`✗ ${r.file}: ${r.error}`);
    continue;
  }
  totalBlocks += r.blocks.length;
  for (const b of r.blocks) {
    totalErrors += b.errors.length;
    if (!asJson) {
      if (b.ok) {
        console.log(`✓ ${r.file}: block ${b.index + 1} (${b.type}) valid`);
      } else {
        console.log(`✗ ${r.file}: block ${b.index + 1} (${b.type}) ${b.errors.length} error(s):`);
        for (const e of b.errors) console.log(`    line ${e.line}: ${e.msg}`);
      }
    }
  }
  report.files.push(r);
}

if (asJson) {
  console.log(JSON.stringify({ totalBlocks, totalErrors, files: report.files }, null, 2));
} else {
  const status = totalErrors === 0 ? 'PASS' : 'FAIL';
  console.log(`\n[${status}] ${totalBlocks} mermaid block(s), ${totalErrors} error(s)`);
}

process.exit(totalErrors === 0 ? 0 : 1);
