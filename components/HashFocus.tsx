'use client';

import { useEffect } from 'react';

/**
 * Marks the element the URL hash points at (data-hash-active="true") so it can
 * be styled. CSS :target doesn't update when Next navigates client-side, so
 * this does it by hand, on load and whenever the hash changes.
 */
export function HashFocus() {
  useEffect(() => {
    let current: Element | null = null;
    const apply = () => {
      current?.removeAttribute('data-hash-active');
      const id = decodeURIComponent(window.location.hash.slice(1));
      current = id ? document.getElementById(id) : null;
      current?.setAttribute('data-hash-active', 'true');
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => {
      window.removeEventListener('hashchange', apply);
      current?.removeAttribute('data-hash-active');
    };
  }, []);
  return null;
}
