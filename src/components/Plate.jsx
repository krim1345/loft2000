import { useEffect, useRef } from 'react';
import { CLIP, still } from '../lib/content.js';

/* Moving footage. Always muted, always inline, never lazy above the fold.
   `from`/`to` clip the source to one coherent stretch — the reel swings from
   night-blue to bright green hills, and a hero should not. */
export function Motion({
  className = '',
  priority = false,
  src = CLIP,
  from,
  to,
  rate = 1,
  objectPosition,
}) {
  const video = useRef(null);

  useEffect(() => {
    const node = video.current;
    if (!node || from == null || to == null) return;

    node.playbackRate = rate;
    const start = () => {
      node.playbackRate = rate;
      if (node.currentTime < from || node.currentTime > to) node.currentTime = from;
    };
    node.addEventListener('loadedmetadata', start);
    node.addEventListener('timeupdate', start);
    if (node.readyState >= 1) start();

    return () => {
      node.removeEventListener('loadedmetadata', start);
      node.removeEventListener('timeupdate', start);
    };
  }, [from, to, rate]);

  return (
    <div className={`plate ${className}`}>
      <video
        ref={video}
        className="plate__video w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority={priority ? 'high' : 'auto'}
        src={src}
        style={objectPosition ? { objectPosition } : undefined}
      />
      <div className="plate__tint" />
      <div className="plate__vignette" />
    </div>
  );
}

/* A frozen frame of the same clip. The browser seeks to #t= and paints that
   frame — so every "photograph" on this page is genuinely of this room. */
export function Still({ at, className = '', caption }) {
  return (
    <figure className={`frame plate ${className}`}>
      <video
        className="plate__still w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
        tabIndex={-1}
        src={still(at)}
      />
      <div className="plate__tint" />
      {caption ? <figcaption className="frame__cap">{caption}</figcaption> : null}
    </figure>
  );
}
