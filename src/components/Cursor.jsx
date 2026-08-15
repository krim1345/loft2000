import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/* Desktop-only. Position eases toward the pointer rather than snapping to
   it — a few milliseconds of glide is what actually reads as "smooth" on a
   custom cursor; zero lag looks like a teleporting dot between mouse
   samples. Shape gets its own, slower ease: a little squash-and-stretch
   physics, like a drop of water dragged across glass. Flick the cursor and
   the ring stretches along the line of travel; stop, and it settles back
   to a circle over a few frames. */

const POS_SETTLE = 0.42; // per-frame ease toward the raw pointer position
const MAX_STRETCH = 1.6;
const SETTLE = 0.16; // per-frame ease toward the target shape — slower, softer
const IDLE_MS = 110; // no new movement for this long -> relax to a circle

export default function Cursor() {
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.classList.add('has-cursor');

    let rawX = 0;
    let rawY = 0;
    let x = 0;
    let y = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let targetStretch = 1;
    let targetAngle = 0;
    let curStretch = 1;
    let curAngle = 0;
    let frame = 0;
    let idleTimer = 0;
    let current = '';
    let labelled = false;
    let primed = false;

    const paint = () => {
      frame = 0;
      x += (rawX - x) * POS_SETTLE;
      y += (rawY - y) * POS_SETTLE;
      curStretch += (targetStretch - curStretch) * SETTLE;
      curAngle += (targetAngle - curAngle) * SETTLE;

      if (ring.current) {
        const stretch = labelled ? 1 : curStretch;
        const squash = labelled ? 1 : Math.max(1 / curStretch, 1 / MAX_STRETCH);
        ring.current.style.transform =
          `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${curAngle.toFixed(1)}deg) ` +
          `scale(${stretch.toFixed(3)}, ${squash.toFixed(3)})`;
      }

      const posSettled = Math.abs(rawX - x) < 0.05 && Math.abs(rawY - y) < 0.05;
      const shapeSettled = Math.abs(curStretch - targetStretch) < 0.003 && targetStretch <= 1.001;
      if (!posSettled || !shapeSettled) frame = requestAnimationFrame(paint);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const speed = Math.hypot(dx, dy) / dt; // px per ms

      rawX = event.clientX;
      rawY = event.clientY;
      if (!primed) {
        x = rawX;
        y = rawY;
        primed = true;
      }

      if (!labelled) {
        targetStretch = Math.min(MAX_STRETCH, 1 + speed * 0.8);
        if (speed > 0.03) targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      }

      lastX = event.clientX;
      lastY = event.clientY;
      lastT = now;

      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        targetStretch = 1;
        schedule();
      }, IDLE_MS);

      schedule();

      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      const next = target ? target.getAttribute('data-cursor') || '' : '';
      if (next !== current) {
        current = next;
        labelled = Boolean(next);
        if (labelled) {
          targetStretch = 1;
          curStretch = 1;
        }
        setLabel(next);
      }
    };

    const onLeave = () => {
      if (ring.current) ring.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (ring.current) ring.current.style.opacity = '1';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      document.body.classList.remove('has-cursor');
      clearTimeout(idleTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={ring} className={`cursor${label ? ' is-labelled' : ''}`} aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}
