import { useEffect } from 'react';

let scrollTop = 0;

export const useNoScroll = (drawerIsOpen: boolean) => {
  useEffect(() => {
    if (drawerIsOpen) {
      scrollTop = document.documentElement.scrollTop;
      document.body.classList.add('no-scroll');
      document.body.style.top = `-${scrollTop}px`;
    } else {
      document.body.classList.remove('no-scroll');
      document.body.removeAttribute('style');
      window.scrollBy({ top: scrollTop });
    }
  }, [drawerIsOpen]);
};
