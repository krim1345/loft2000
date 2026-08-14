export default function Mast({ onBook }) {
  return (
    <footer className="movement">
      <div className="shell mast">
        <p className="mast__name">
          Loft 2000<sup>®</sup>
        </p>

        <hr className="rule" />

        <div className="mast__row">
          <span className="label">Brooklyn, NY</span>
          <nav className="mast__links" aria-label="Elsewhere">
            <a className="mast__link" href="#top">
              Instagram
            </a>
            <a className="mast__link" href="mailto:nights@loft2000.nyc">
              Contact
            </a>
            <button type="button" className="mast__link" onClick={onBook} data-cursor="Book">
              Book
            </button>
          </nav>
          <span className="label tabular">© 2003—2026 Loft 2000</span>
        </div>
      </div>
    </footer>
  );
}
