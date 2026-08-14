import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/* Reveal once, then disconnect. Used on four elements in total — section
   heads and the collage — not on every block. */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        io.disconnect();
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}

/* Transform-only, rAF-batched, desktop-only, off under reduced motion. */
export function useParallax(strength = 0.06) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia('(max-width: 860px)').matches) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-fromCentre * strength).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, [strength, reduced]);

  return ref;
}

/* Time passes in the loft at about one minute every four seconds. It is the
   only thing on the page that moves by itself, and it never flickers. */
export function useSlowClock(startHour = 2, startMinute = 37, stepMs = 4200) {
  const reduced = useReducedMotion();
  const [minutes, setMinutes] = useState(startHour * 60 + startMinute);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setMinutes((v) => (v + 1) % 1440), stepMs);
    return () => clearInterval(id);
  }, [reduced, stepMs]);

  const h24 = Math.floor(minutes / 60);
  const mm = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

  return {
    time: `${String(h12).padStart(2, '0')}:${String(mm).padStart(2, '0')}`,
    suffix: h24 < 12 ? 'AM' : 'PM',
  };
}

/* True once the reader has scrolled past a given element. */
export function usePassed(targetId) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setPassed(entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return passed;
}

export function useScrolled(after = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      setScrolled(window.scrollY > after);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [after]);

  return scrolled;
}

/* Locks the page behind a fullscreen layer without letting it jump. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previous = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    body.classList.add('no-scroll');
    return () => {
      body.classList.remove('no-scroll');
      body.style.paddingRight = previous;
    };
  }, [locked]);
}
