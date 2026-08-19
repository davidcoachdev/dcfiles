export function validateLoaderExports(namespace) {
  const valid = Object.values(namespace ?? {}).every((value) => typeof value === "function" || (value && typeof value.server === "function"))
  return valid ? { status: "valid" } : { status: "blocked", reason: "unsupported-loader-export" }
}
