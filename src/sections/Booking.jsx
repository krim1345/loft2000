import Reveal from '../components/Reveal.jsx';

export default function Booking({ onBook }) {
  return (
    <section className="movement pad-tall">
      <div className="shell book">
        <Reveal className="head head--wide">
          <h2 className="display display--xl">
            Make
            <br />
            a night
            <br />
            of it.
          </h2>
        </Reveal>

        <p className="body-copy">
          Available for shoots, dinners, parties, music sessions and whatever happens after.
        </p>

        <button type="button" className="cta cta--huge" onClick={onBook} data-cursor="Book">
          <span className="cta__label">Book the loft →</span>
          <span className="cta__bar" aria-hidden="true" />
        </button>

        <div className="book__terms">
          <span className="book__price tabular">From $450 / night</span>
          <span className="label">Maximum capacity: 20 people</span>
        </div>
      </div>
    </section>
  );
}
