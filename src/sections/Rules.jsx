import Reveal from '../components/Reveal.jsx';
import { RULES } from '../lib/content.js';

/* The numbers stay because these are genuinely a numbered list — house rules
   pinned by the door, in order. */
export default function Rules() {
  return (
    <section className="movement pad-tight">
      <div className="shell">
        <Reveal className="head head--wide">
          <h2 className="display display--lg">
            The apartment has rules.
          </h2>
        </Reveal>

        <ol className="rules">
          {RULES.map((rule, i) => (
            <li key={rule} className="rules__item">
              <span className="rules__n tabular">{String(i + 1).padStart(2, '0')}</span>
              <p className="rules__text">{rule}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
