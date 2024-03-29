import { useEffect, useRef, useState } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const [timer, setTimer] = useState<any>();
  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    setTimer(id);

    return () => {
      clearInterval(id);
      setTimer(null);
    };
  }, [delay]);

  return { timer };
}
