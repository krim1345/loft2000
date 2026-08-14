import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Panel from './Panel.jsx';
import { MOODS } from '../lib/content.js';
import { useMood } from '../lib/mood.jsx';

/* A small dock, present from the first frame — not gated behind a scroll
   threshold or buried mid-page. It stays a chip until you ask for more, so
   it never has to fight a section's own content for the same corner. */
export default function Remote() {
  const { mood } = useMood();
  const [open, setOpen] = useState(false);
  const active = MOODS.find((m) => m.id === mood) ?? MOODS[2];

  return (
    <motion.div
      className="remote"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            className="remote__panel glass"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: 10, borderRadius: 'var(--radius-panel)' }}
          >
            <span className="label remote__caption" id="remote-label">
              Set the mood
            </span>
            <Panel compact labelledBy="remote-label" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        className="remote__chip glass"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor="Set"
      >
        <span className="remote__dot" aria-hidden="true" />
        <span className="remote__chip-label">{active.key}</span>
      </button>
    </motion.div>
  );
}
