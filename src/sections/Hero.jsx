import { motion } from 'motion/react';
import { Motion } from '../components/Plate.jsx';

const line = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const enter = (event) => {
    event.preventDefault();
    document.getElementById('space')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="top">
      <div className="hero__ground fixed inset-0 overflow-hidden bg-black" aria-hidden="true">
        {/* The one ambient, near-static aero loop — sky, grass, waterline,
            bubbles. Portrait source (9:16), so the crop is tuned to keep the
            waterline in frame on a wide screen rather than zooming into flat
            sky. Never stretched — object-fit: cover only. */}
        <Motion priority className="w-full h-full" src="/hero.mp4" objectPosition="50% 30%" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__inner">
        <h1 className="display display--mega hero__type">
          <motion.span className="hero__line" {...line(0.15)}>
            Welcome
          </motion.span>
          <motion.span className="hero__line" {...line(0.3)}>
            to 2003.
          </motion.span>
        </h1>

        <div className="hero__meta">
          <motion.div {...line(0.55)} style={{ display: 'grid', gap: '1.25rem' }}>
            <p className="hero__sub">A private loft for nights worth remembering.</p>
            <div>
              <a className="cta cta--type" href="#space" onClick={enter} data-cursor="Explore">
                <span className="cta__label">Enter the loft →</span>
                <span className="cta__bar" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
