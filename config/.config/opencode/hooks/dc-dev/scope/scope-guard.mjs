import { existsSync, lstatSync, realpathSync } from "node:fs"
import { isAbsolute, dirname, join, normalize, relative, resolve, sep } from "node:path"

export function createScopeGuard(root, allowedPaths) {
  const canonicalRoot = existsSync(root) ? realpathSync(root) : resolve(root)
  const canonicalAllowed = new Set(allowedPaths.map((path) => canonicalize(canonicalRoot, path)))
  return {
    check(candidate) {
      if (typeof candidate !== "string" || candidate.length === 0) return { allowed: false, reason: "invalid-path" }
      const normalized = normalize(candidate)
      if (!isAbsolute(candidate) && (normalized === ".." || normalized.startsWith(`..${sep}`))) {
        return { allowed: false, reason: "path-traversal" }
      }
      const absoluteCandidate = isAbsolute(normalized) ? normalized : resolve(canonicalRoot, normalized)
      const canonicalCandidate = canonicalize(canonicalRoot, absoluteCandidate)
      if (!isWithin(canonicalRoot, canonicalCandidate)) {
        return { allowed: false, reason: "symlink-escape" }
      }
      if (containsSymlink(canonicalRoot, absoluteCandidate)) {
        return { allowed: false, reason: "symlink-path" }
      }
      const allowed = [...canonicalAllowed].some((allowedPath) => canonicalCandidate === allowedPath || canonicalCandidate.startsWith(`${allowedPath}${sep}`))
      return allowed
        ? { allowed: true, canonicalPath: canonicalCandidate }
        : { allowed: false, reason: "out-of-scope" }
    },
  }
}

function isWithin(root, candidate) {
  return candidate === root || candidate.startsWith(`${root}${sep}`)
}

function containsSymlink(root, absoluteCandidate) {
  if (!isWithin(root, absoluteCandidate)) return true
  let current = root
  const parts = relative(root, absoluteCandidate).split(sep).filter(Boolean)
  for (const part of parts) {
    current = join(current, part)
    if (existsSync(current) && lstatSync(current).isSymbolicLink()) return true
  }
  return false
}

function canonicalize(root, candidate) {
  const absolute = resolve(root, candidate)
  if (existsSync(absolute)) return realpathSync(absolute)
  let parent = dirname(absolute)
  while (!existsSync(parent) && parent !== dirname(parent)) {
    parent = dirname(parent)
  }
  const canonicalParent = realpathSync(parent)
  return normalize(join(canonicalParent, relative(parent, absolute)))
}
