import Reveal from '../components/Reveal.jsx';
import { LOCATION } from '../lib/content.js';

/* A real, interactive Google Maps embed — draggable and zoomable, centred on
   a plausible Williamsburg block. The full address goes out once a date is
   confirmed, not before. */
export default function Location() {
  return (
    <section className="movement pad-mid" id="location">
      <div className="shell">
        <Reveal className="head head--wide">
          <h2 className="display display--xl">Come find us.</h2>
          <p className="display display--lg">
            Brooklyn
            <br />
            New York
          </p>
        </Reveal>

        <div className="map">
          <div className="map__embed">
            <iframe
              title="Loft 2000 — approximate area, Williamsburg, Brooklyn"
              src={LOCATION.embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map__embed-tint" aria-hidden="true" />
          </div>
          <div className="map__legend">
            <span className="label">15 min from Manhattan</span>
            <span className="label">L train to Bedford Av · 4 min on foot</span>
            <span className="label">Four floors up · no lift · 20 people</span>
            <span className="label">Full address once the date is confirmed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
