import { useEffect, useRef } from 'react';

export const useClickOutside = (ref: any, callback: any) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (ref.current?.contains(e.target)) return false;

      callbackRef.current(e);
    };

    document.addEventListener('click', handleMouseUp, true);

    return () => {
      document.removeEventListener('click', handleMouseUp, true);
    };
  }, [ref, callback]);
};
