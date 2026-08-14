import { LEVELS, MOODS } from '../lib/content.js';
import { useMood } from '../lib/mood.jsx';

function Meter({ mood }) {
  const bars = LEVELS[mood];
  return (
    <div className="meter" aria-hidden="true">
      {bars.map((height, i) => (
        <span
          key={i}
          className={`meter__bar${height > 50 ? ' is-on' : ''}`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

/* The signature object: a brushed-chrome remote for the room. The lime LCD
   is the one colour that never changes with the light — the electronics do
   not care what time it is. */
export default function Panel({ compact = false, labelledBy }) {
  const { mood, setMood } = useMood();
  const active = MOODS.find((m) => m.id === mood) ?? MOODS[2];

  return (
    <div className="panel" data-cursor="Set">
      <div className="panel__screen">
        <span className="panel__time tabular">
          {active.clock}
          <span className="panel__sub"> {active.suffix}</span>
        </span>

        <Meter mood={mood} />

        <span className="panel__stack">
          <span className="panel__state">{active.state}</span>
          {compact ? null : <span className="panel__sub">{active.sub}</span>}
        </span>
      </div>

      <div className="panel__deck" role="group" aria-labelledby={labelledBy}>
        {MOODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className="key"
            aria-pressed={m.id === mood}
            onClick={() => setMood(m.id)}
          >
            {m.key}
          </button>
        ))}
      </div>
    </div>
  );
}
