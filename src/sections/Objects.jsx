import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Reveal from '../components/Reveal.jsx';
import { Still } from '../components/Plate.jsx';
import { OBJECTS, tape } from '../lib/content.js';

/* A fixed preview panel that crossfades to the selected item — nothing
   chases the pointer. Real photography where it exists (the tub, the glass
   wall, the sofa); a frame of the tape for the electronics, since that is
   genuinely what those items are about. */
function Preview({ item }) {
  return (
    <div className="details__preview">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          className="frame--fill"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.src ? (
            <img
              src={item.src}
              alt={item.name}
              className="frame--fill"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Still at={item.t} className="frame--fill" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="details__preview-cap">
        {item.src ? item.name : tape(item.t)}
      </span>
    </div>
  );
}

export default function Objects() {
  const [selected, setSelected] = useState(0);
  const active = OBJECTS[selected];

  return (
    <section className="movement pad-mid" id="details">
      <div className="shell">
        <Reveal className="head head--wide">
          <h2 className="display display--xl">
            Things
            <br />
            you&apos;ll find here.
          </h2>
        </Reveal>

        <div className="details">
          <div className="index is-probing" role="tablist" aria-label="What's in the loft">
            {OBJECTS.map((object, i) => (
              <button
                key={object.name}
                type="button"
                role="tab"
                aria-selected={selected === i}
                className={`index__row${selected === i ? ' is-live' : ''}`}
                onPointerEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
                data-cursor="View"
              >
                <span className="index__name">{object.name}</span>
                <span className="index__spec">{object.spec}</span>
              </button>
            ))}
          </div>

          <Preview item={active} />
        </div>
      </div>
    </section>
  );
}
