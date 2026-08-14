import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV } from '../lib/content.js';
import { useScrolled, useScrollLock } from '../lib/hooks.js';

const sheetVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.16 } },
};

export default function Rail({ onBook }) {
  const docked = useScrolled(60);
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`rail${docked ? ' is-docked' : ''}`}>
        <a className="wordmark" href="#top">
          Loft 2000<sup>®</sup>
        </a>

        <nav className="rail__links" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} className="rail__link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="rail__right">
          <button type="button" className="cta cta--solid" onClick={onBook} data-cursor="Book">
            <span>
              Book<span className="cta__long"> the loft</span>
            </span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="rail__burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            variants={sheetVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.div className="sheet__head" variants={itemVariants}>
              <span className="wordmark">
                Loft 2000<sup>®</sup>
              </span>
              <button
                type="button"
                className="rail__burger"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </motion.div>

            <nav className="sheet__links" aria-label="Sections">
              {NAV.map((item) => (
                <motion.a
                  key={item.href}
                  className="sheet__link"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={itemVariants}
                  whileHover={{ x: '0.25em' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div className="sheet__foot" variants={itemVariants}>
              <span className="label">Brooklyn · New York</span>
              <button
                type="button"
                className="cta cta--type"
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
              >
                <span className="cta__label">Book the loft →</span>
                <span className="cta__bar" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
