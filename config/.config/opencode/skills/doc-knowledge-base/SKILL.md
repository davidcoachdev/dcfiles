---
name: doc-knowledge-base
description: >
  Build and query local knowledge bases from office documents (PDF, PPTX, DOCX, XLSX, EML, MD, TXT) with strict provenance tracing and evidence-first answers. Trigger: When building document knowledge bases, parsing office files, creating searchable document corpora, or needing grounded answers with source attribution from local files.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building a searchable knowledge base from a collection of documents
- Parsing and extracting structured content from PDFs, presentations, spreadsheets, emails
- Answering questions with strict source attribution (every claim must trace to a file and page)
- Creating evidence bundles that link answers to their original documents
- Syncing a document corpus when files are added, removed, or modified
- Converting complex office formats into structured, queryable text while preserving layout semantics

## Critical Patterns

### 1. Provenance-First Answers

Every answer MUST include source attribution. No exceptions.

```
Format: [Source: filename.ext, page/slide/sheet, paragraph/section]
```

**Wrong**: "The risk level is high across all departments."
**Right**: "The risk level is high across all departments. [Source: risk-assessment-Q4.xlsx, Sheet 'Summary', Row 14] [Source: board-presentation.pptx, Slide 7, Notes]"

Rules:
- Never claim a fact without pointing to its source file
- Never blend sources into an anonymous narrative
- If multiple sources conflict, state the conflict explicitly with both attributions
- If no source supports a claim, say "No source found" — never fabricate

### 2. Document Parsing Strategy Per Format

| Format | Tool | Strategy |
|--------|------|----------|
| `.pdf` | PyMuPDF (`pymupdf`), `pypdf` | Extract text by page, preserve page numbers, extract tables as structured data |
| `.pptx` | `python-pptx` | Extract slide text, presenter notes, table data, image descriptions |
| `.docx` | `python-docx` | Extract paragraphs with headings, tables, comments, track changes |
| `.xlsx` | `openpyxl` | Extract by sheet, preserve cell references, detect merged cells |
| `.eml` | Python `email` module | Extract headers, body (text + HTML), attachments metadata |
| `.md`, `.txt` | Direct read | Preserve heading structure, code blocks, links |
| `.csv`, `.tsv` | Python `csv` | Parse with headers, detect delimiters |

### 3. Knowledge Base Directory Structure

```
project/
├── original_doc/          # Source files (never modify)
├── knowledge_base/
│   ├── staging/           # Parsed but not yet validated
│   │   ├── filename.pdf.json
│   │   └── filename.pptx.json
│   └── current/           # Published, queryable knowledge base
│       ├── filename.pdf.json
│       ├── filename.pptx.json
│       └── manifest.json  # Source list with hashes and timestamps
└── runtime/
    └── answers/           # Generated answers with provenance
```

### 4. Staged Knowledge Construction Pipeline

```
original_doc/ → [PARSE] → staging/ → [VALIDATE] → current/
                      ↑               ↑
                 format-specific   structural check
                 extraction        (no empty fields,
                                   source refs valid)
```

**Parse step**: Convert each document to structured JSON with:
- `source_file`: original filename
- `source_type`: pdf/pptx/docx/xlsx/eml/md/txt
- `content`: extracted text organized by page/slide/sheet
- `metadata`: page count, slide count, sheet names, author, dates
- `tables`: extracted as structured data (array of arrays)
- `provenance_id`: hash of source file for sync detection

**Validate step**: Check that:
- No empty `content` fields (or flag as "unparseable")
- `provenance_id` exists and matches source file hash
- All page/slide/sheet references are within valid range
- JSON is valid and parseable

**Publish step**: Copy validated files from `staging/` to `current/`, update `manifest.json`.

### 5. Incremental Sync (Not Full Rebuild)

When files change in `original_doc/`:

```
1. Hash all source files → compare with manifest.json hashes
2. New files → parse → validate → add to current/
3. Changed files → re-parse → validate → replace in current/
4. Deleted files → remove from current/
5. Update manifest.json with new state
```

**Never force full rebuild unless manifest is corrupted.**

### 6. Evidence Bundle Format

When answering questions, construct evidence bundles:

```json
{
  "answer": "Risk level is HIGH for 3 departments...",
  "evidence": [
    {
      "source_file": "risk-assessment-Q4.xlsx",
      "source_type": "xlsx",
      "location": "Sheet 'Summary', Row 14",
      "excerpt": "Department A: Risk Level HIGH...",
      "confidence": "high"
    },
    {
      "source_file": "board-presentation.pptx",
      "source_type": "pptx",
      "location": "Slide 7, Notes",
      "excerpt": "All three departments exceeded threshold...",
      "confidence": "high"
    }
  ],
  "cross_reference": "Both sources agree on HIGH classification"
}
```

### 7. Format-as-Semantics Preservation

Critical: document formatting carries meaning. Preserve it:

- **Red text** → flag as "risk" or "warning" semantics
- **Bold/headers** → preserve as structural markers
- **Indentation** → preserve as hierarchy indicators
- **Tables** → extract as structured data, not flat text
- **Presenter notes** (PPTX) → always extract, often contain key insights
- **Hidden sheets** (XLSX) → detect and extract, may contain calculations

### 8. Cross-Document Reasoning

When synthesizing across multiple documents:

1. **Identify overlap**: Find the same topic across files
2. **Reconcile conflicts**: If Source A says X and Source B says Y, present both with attribution
3. **Synthesize**: Build a coherent answer that explicitly notes which source contributes which part
4. **Never blend**: Don't merge sources into one anonymous narrative

### 9. Quality Gates

Before publishing to `current/`:

- [ ] Every JSON file has valid `source_file` pointing to existing file in `original_doc/`
- [ ] No empty content fields (or explicitly marked as unparseable)
- [ ] `provenance_id` matches source file hash
- [ ] All tables extracted as structured data (not raw text)
- [ ] Manifest lists all source files with correct hashes
- [ ] No orphaned entries (files in current/ not in manifest)

### 10. Handling Unparseable Content

Some content can't be extracted cleanly. For each:

- **Scanned PDFs** (image-only): Flag in metadata as `requires_ocr`, include page count
- **Complex charts** (PPTX): Extract title + notes, flag as `visual_chart_not_extracted`
- **Macros/embedded** (XLSX): Extract visible sheet data, flag as `macros_not_executed`
- **Encrypted files**: Skip entirely, log filename in manifest as `encrypted_skipped`

## Commands

### Parse all documents in original_doc/

```bash
# Using Python with standard libraries
python3 -c "
import pathlib, json, hashlib
for f in pathlib.Path('original_doc').iterdir():
    print(f'{f.name}: {f.suffix} ({f.stat().st_size} bytes)')
"

# Parse specific formats
python3 -m docmason parse --source original_doc/ --output staging/
```

### Build/validate knowledge base

```bash
python3 -m docmason build --staging staging/ --output current/
python3 -m docmason validate --source current/
```

### Sync after changes

```bash
python3 -m docmason sync --source original_doc/ --knowledge-base current/
```

### Query the knowledge base

```bash
python3 -m docmason ask "What are the main risks across these documents?"
```

## Decision Trees

### Which parsing approach?

```
Is the file a PDF?
├── Yes → Has selectable text?
│   ├── Yes → PyMuPDF (pymupdf) → extract by page
│   └── No → Scanned/image → flag as requires_ocr
└── No → Is it PPTX?
    ├── Yes → python-pptx → extract slides + notes + tables
    └── No → Is it DOCX?
        ├── Yes → python-docx → extract paragraphs + tables + comments
        └── No → Is it XLSX?
            ├── Yes → openpyxl → extract by sheet with cell refs
            └── No → Is it EML?
                ├── Yes → email module → extract headers + body
                └── No → Is it MD/TXT/CSV?
                    ├── Yes → Direct read → preserve structure
                    └── No → Unknown format → flag for manual review
```

### How to handle conflicting sources?

```
Source A says X, Source B says Y
├── Are they about the same entity/timeframe?
│   ├── Yes → Present conflict explicitly: "Source A reports X [ref], Source B reports Y [ref]"
│   └── No → Different contexts → present both with their contexts
└── Is one more authoritative/recent?
    ├── Yes → Lead with authoritative, note the discrepancy
    └── No → Equal weight → present both, note uncertainty
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]