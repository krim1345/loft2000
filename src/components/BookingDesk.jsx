import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react';
import { OCCASIONS } from '../lib/content.js';
import { useScrollLock } from '../lib/hooks.js';

const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HORIZON = 9;

function monthCells(year, month) {
  const leading = (new Date(year, month, 1).getDay() + 6) % 7;
  const length = new Date(year, month + 1, 0).getDate();
  return [...Array(leading).fill(null), ...Array.from({ length }, (_, i) => i + 1)];
}

const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
};

/* A small anchored card, not a fullscreen takeover — it opens from the
   corner it was summoned from, and a click on the backdrop closes it. */
export default function BookingDesk({ onClose }) {
  const today = useRef(new Date()).current;
  const [offset, setOffset] = useState(0);
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState(12);
  const [occasion, setOccasion] = useState(null);
  const [sent, setSent] = useState(false);
  const closeRef = useRef(null);

  useScrollLock(true);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const shown = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = shown.getFullYear();
  const month = shown.getMonth();
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const ready = Boolean(date && occasion);

  const stamp = date
    ? `${WEEKDAY[new Date(date.y, date.m, date.d).getDay()]} ${date.d} ${MONTHS[date.m].slice(0, 3)} ${date.y}`
    : '';

  return (
    <>
      <motion.div
        className="desk-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.section
        className="desk glass"
        role="dialog"
        aria-modal="true"
        aria-label="Request a date"
        initial={{ opacity: 0, scale: 0.92, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -8 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="desk__inner">
          <div className="desk__head">
            <span className="wordmark">
              Loft 2000<sup>®</sup>
            </span>
            <button
              ref={closeRef}
              type="button"
              className="rail__burger"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div className="desk__done" key="done" {...rise}>
                <p className="label label--lcd">Request logged · no card charged</p>
                <h2 className="step__q">We&apos;ll write back today.</h2>
                <p className="body-copy" style={{ fontSize: 'var(--text-md)' }}>
                  {stamp} · {guests} {guests === 1 ? 'person' : 'people'} · {occasion}. Someone
                  reads every one of these — usually the person who lives here.
                </p>
                <div>
                  <button type="button" className="cta cta--type" onClick={onClose}>
                    <span className="cta__label">Back to the loft →</span>
                    <span className="cta__bar" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="desk__steps">
                  <motion.div className="step" {...rise}>
                    <h2 className="step__q">When are we doing this?</h2>

                    <div className="cal">
                      <div className="cal__head">
                        <span className="cal__month tabular">
                          {MONTHS[month]} {year}
                        </span>
                        <span style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="cal__nav"
                            aria-label="Previous month"
                            disabled={offset === 0}
                            onClick={() => setOffset((v) => Math.max(0, v - 1))}
                          >
                            <ChevronLeft size={14} strokeWidth={1.5} />
                          </button>
                          <button
                            type="button"
                            className="cal__nav"
                            aria-label="Next month"
                            disabled={offset === HORIZON}
                            onClick={() => setOffset((v) => Math.min(HORIZON, v + 1))}
                          >
                            <ChevronRight size={14} strokeWidth={1.5} />
                          </button>
                        </span>
                      </div>

                      <div className="cal__grid">
                        {DOW.map((d) => (
                          <span key={d} className="cal__dow">
                            {d}
                          </span>
                        ))}
                        {monthCells(year, month).map((day, i) =>
                          day === null ? (
                            <span key={`pad-${i}`} />
                          ) : (
                            <motion.button
                              key={day}
                              type="button"
                              className="cal__day"
                              whileTap={{ scale: 0.88 }}
                              disabled={new Date(year, month, day) < midnight}
                              aria-pressed={
                                Boolean(date) && date.y === year && date.m === month && date.d === day
                              }
                              aria-label={`${day} ${MONTHS[month]} ${year}`}
                              onClick={() => setDate({ y: year, m: month, d: day })}
                            >
                              {day}
                            </motion.button>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {date ? (
                      <motion.div className="step" key="guests" {...rise}>
                        <h2 className="step__q">How many people?</h2>
                        <div className="counter">
                          <motion.button
                            type="button"
                            className="counter__btn"
                            whileTap={{ scale: 0.88 }}
                            aria-label="One fewer"
                            disabled={guests <= 1}
                            onClick={() => setGuests((v) => Math.max(1, v - 1))}
                          >
                            <Minus size={16} strokeWidth={1.5} />
                          </motion.button>
                          <span className="counter__n tabular">{guests}</span>
                          <motion.button
                            type="button"
                            className="counter__btn"
                            whileTap={{ scale: 0.88 }}
                            aria-label="One more"
                            disabled={guests >= 20}
                            onClick={() => setGuests((v) => Math.min(20, v + 1))}
                          >
                            <Plus size={16} strokeWidth={1.5} />
                          </motion.button>
                          <span className="label">
                            {guests >= 20 ? 'Ceiling — 20' : 'Holds 20'}
                          </span>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <AnimatePresence>
                    {date ? (
                      <motion.div className="step" key="occasion" {...rise} transition={{ ...rise.transition, delay: 0.06 }}>
                        <h2 className="step__q">What&apos;s the occasion?</h2>
                        <div className="chips">
                          {OCCASIONS.map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              className="chip"
                              whileTap={{ scale: 0.94 }}
                              aria-pressed={occasion === option}
                              onClick={() => setOccasion(option)}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="desk__foot">
                  <span className="label label--lcd tabular">
                    {date ? `${stamp} · ${guests} · ${occasion ?? '—'}` : 'Pick a night'}
                  </span>
                  <button
                    type="button"
                    className="desk__send"
                    disabled={!ready}
                    onClick={() => setSent(true)}
                  >
                    Request →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </>
  );
}
