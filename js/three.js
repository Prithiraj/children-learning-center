/**
 * Three.js concern boundary.
 *
 * The approved design intentionally does not load Three.js. Keeping this module
 * makes that decision explicit while preserving the requested JS-by-concern
 * architecture if a future, evidence-backed use case appears.
 */
export function initThree() {
  return false;
}
