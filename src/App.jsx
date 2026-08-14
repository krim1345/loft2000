import { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';

import { MoodProvider } from './lib/mood.jsx';
import Grain from './components/Grain.jsx';
import Cursor from './components/Cursor.jsx';
import Rail from './components/Rail.jsx';
import Remote from './components/Remote.jsx';
import BookingDesk from './components/BookingDesk.jsx';

import Hero from './sections/Hero.jsx';
import Space from './sections/Space.jsx';
import Objects from './sections/Objects.jsx';
import Rules from './sections/Rules.jsx';
import Location from './sections/Location.jsx';
import Booking from './sections/Booking.jsx';
import Mast from './sections/Mast.jsx';

export default function App() {
  const [booking, setBooking] = useState(false);
  const open = useCallback(() => setBooking(true), []);
  const close = useCallback(() => setBooking(false), []);

  return (
    <MoodProvider>
      <a className="skip-link" href="#space">
        Skip to the loft
      </a>

      <Grain />
      <Cursor />
      <Rail onBook={open} />
      <Remote />

      <main>
        <Hero />
        <Space />
        <Objects />
        <Rules />
        <Location />
        <Booking onBook={open} />
      </main>

      <Mast onBook={open} />

      <AnimatePresence>
        {booking ? <BookingDesk onClose={close} /> : null}
      </AnimatePresence>
    </MoodProvider>
  );
}
