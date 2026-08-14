/* One fixed, static noise layer. It never animates — the goal is the texture
   of a scanned print, not a broken television. */
export default function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
