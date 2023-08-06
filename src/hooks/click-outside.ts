import { useEffect, useRef } from 'react';

export const useClickOutside = (ref: any, callback: any) => {
  const callbackRef = useRef(callback);

  // Keep the callback fresh between renders
  // preventing from passing "callback" to the useEffect
  // that would clear the listener on every render when "callback" reference changes
  callbackRef.current = callback;

  useEffect(() => {
    const handleMouseUp = (e: any) => {
      // Do not trigger click outside on auxiliary buttons
      // See MDN => https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
      if (e.button > 0) return false;

      // Verify if the clicked element is contained by the one stored in "ref"
      if (!ref.current?.contains(e.target)) {
        callbackRef.current(e);
      }
    };

    document.addEventListener('mouseup', handleMouseUp, true);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp, true);
    };
  }, [ref]);
};
