import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MoodContext = createContext(null);

/* One piece of state runs the whole page. Changing it re-lights every
   section at once, because every colour in the build is a mood token. */
export function MoodProvider({ children }) {
  const [mood, setMood] = useState('night');

  useEffect(() => {
    document.documentElement.setAttribute('data-mood', mood);
  }, [mood]);

  const value = useMemo(() => ({ mood, setMood }), [mood]);
  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) throw new Error('useMood must be used inside MoodProvider');
  return context;
}
