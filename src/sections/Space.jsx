import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Plan from '../components/Plan.jsx';
import Reveal from '../components/Reveal.jsx';
import { GALLERY } from '../lib/content.js';

/* A real photo gallery — drag the stage, or click a thumbnail. The active
   thumbnail expands; the rest collapse to a sliver, so the strip always
   shows where you are in the set without needing dots. */
function Gallery() {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (dragging || !stageRef.current) return;
    const width = stageRef.current.offsetWidth || 1;
    const controls = animate(x, -index * width, { type: 'spring', stiffness: 340, damping: 34 });
    return () => controls.stop();
  }, [index, dragging, x]);

  const go = (next) => setIndex(Math.max(0, Math.min(GALLERY.length - 1, next)));

  return (
    <div className="gallery">
      <div className="gallery__stage" ref={stageRef}>
        <motion.div
          className="gallery__track"
          drag="x"
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false);
            const width = stageRef.current?.offsetWidth || 1;
            const { offset, velocity } = info;
            let next = index;
            if (Math.abs(velocity.x) > 500) next = velocity.x < 0 ? index + 1 : index - 1;
            else if (Math.abs(offset.x) > width * 0.22) next = offset.x < 0 ? index + 1 : index - 1;
            go(next);
          }}
          style={{ x }}
        >
          {GALLERY.map((item) => (
            <div className="gallery__slide" key={item.src}>
              <img className="gallery__img" src={item.src} alt={item.title} draggable={false} />
              <div className="gallery__cap">
                <span className="gallery__cap-title">{item.title}</span>
                <span className="gallery__cap-note">{item.note}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--prev"
          aria-label="Previous photo"
          disabled={index === 0}
          onClick={() => go(index - 1)}
          data-cursor="View"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--next"
          aria-label="Next photo"
          disabled={index === GALLERY.length - 1}
          onClick={() => go(index + 1)}
          data-cursor="View"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="gallery__strip" role="tablist" aria-label="Photos">
        {GALLERY.map((item, i) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.title}
            className={`gallery__thumb${i === index ? ' is-active' : ''}`}
            onClick={() => go(i)}
          >
            <img src={item.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Space() {
  return (
    <section className="movement pad-tall" id="space">
      <div className="shell">
        <Reveal className="head head--wide">
          <h2 className="display display--xl">
            Not an
            <br />
            event space.
          </h2>
          <p className="head__note">
            A place that already has a story. Someone lived here through every year the
            furniture remembers, and none of it was bought to be photographed.
          </p>
        </Reveal>

        <Reveal>
          <Gallery />
        </Reveal>

        <Reveal className="plan-block" data-cursor="View">
          <Plan />
        </Reveal>
      </div>
    </section>
  );
}
