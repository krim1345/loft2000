/* The one supplied Y2K clip is a 21-second aqua reel — a chrome media-player
   skin, bubbles over a skyline, water, a rainbow. It is not footage of the
   apartment, so it is never captioned as if it were. On this site it plays
   the part it actually plays: what is on the screens.
   The apartment itself is drawn — see components/Plan.jsx — and photographed
   for real in the gallery below, three liminal, glass-and-water interiors
   that carry the loft's own atmosphere. */

export const CLIP = '/loft.mp4';

export const still = (seconds) => `${CLIP}#t=${seconds}`;

/* These plates are frames of the tape, not photographs of the objects beside
   them. Captioning them by timecode says so plainly. */
export const tape = (seconds) => `Tape · 00:${String(Math.round(seconds)).padStart(2, '0')}`;

export const MOODS = [
  { id: 'day', key: 'DAY', clock: '11:40', suffix: 'AM', state: 'Curtains open', sub: 'Quiet · nobody here yet' },
  { id: 'sunset', key: 'SUNSET', clock: '07:52', suffix: 'PM', state: 'Golden hour', sub: 'Filling up · first records on' },
  { id: 'night', key: '02:00 AM', clock: '02:37', suffix: 'AM', state: 'After hours', sub: 'Full · nobody wants to leave' },
];

/* Bar heights, in percent. The room simply gets louder as the night goes on —
   the meter reports that, it does not idle. */
export const LEVELS = {
  day: [14, 22, 11, 26, 17, 20, 9, 24, 13, 19, 8, 16],
  sunset: [40, 55, 32, 61, 44, 50, 28, 58, 36, 47, 25, 42],
  night: [72, 88, 54, 96, 63, 80, 45, 91, 58, 74, 40, 66],
};

export const NAV = [
  { label: 'Space', href: '#space' },
  { label: 'Details', href: '#details' },
  { label: 'Location', href: '#location' },
];

/* Real photography — three liminal, blue-lit interiors, the actual DNA of
   the loft. Draggable or click-through, not a fixed collage. */
export const GALLERY = [
  {
    src: '/gallery/jacuzzi.jpg',
    title: 'The tub room',
    note: 'Black tile · always warm',
  },
  {
    src: '/gallery/glassblock.jpg',
    title: 'The glass wall',
    note: 'Cobalt at dusk · original 1978 block',
  },
  {
    src: '/gallery/lounge.jpg',
    title: 'The blue room',
    note: 'Leather · low light · nobody remembers whose idea it was',
  },
];

export const OBJECTS = [
  { name: 'CRT TV', spec: 'Trinitron · 14 inch', src: '/gallery/lounge.jpg' },
  { name: 'Leather sofa', spec: 'Brown · seats six', src: '/gallery/lounge.jpg' },
  { name: 'CD player', spec: 'Five-disc carousel', t: 2.7 },
  { name: 'The tub', spec: 'Jets on request', src: '/gallery/jacuzzi.jpg' },
  { name: 'Glass block wall', spec: 'Original · 1978', src: '/gallery/glassblock.jpg' },
  { name: 'Neon light', spec: 'Red · always on', t: 19.2 },
  { name: 'Polaroid wall', spec: '600 film · bring yours', t: 15.9 },
  { name: 'Record player', spec: 'Belt drive · 33 and 45', t: 12.6 },
];

/* A house's rules, not a manifesto — short, on purpose. */
export const RULES = [
  'No fluorescent lighting.',
  'Shoes stay on.',
  'Someone always controls the music.',
  'The last person leaving gets the aux.',
  'If the sun is up, you stayed too long.',
];

export const OCCASIONS = ['Party', 'Photo shoot', 'Dinner', 'Music', 'Film', 'Other'];

/* Williamsburg, Brooklyn — a plausible block, not the literal address (that
   goes out once a date is confirmed). */
export const LOCATION = {
  query: 'North 9th Street, Williamsburg, Brooklyn, NY',
  embedSrc:
    'https://www.google.com/maps?q=North+9th+St+%26+Bedford+Ave,+Brooklyn,+NY&z=15&hl=en&output=embed',
};
