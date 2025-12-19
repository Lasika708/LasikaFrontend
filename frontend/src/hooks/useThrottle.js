import { useRef, useCallback } from 'react';

/**
 * Custom hook to throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Throttled function
 */
export const useThrottle = (func, delay = 100) => {
  const timeoutRef = useRef(null);
  const lastRanRef = useRef(Date.now());

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRanRef.current >= delay) {
        func(...args);
        lastRanRef.current = now;
      } else {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          func(...args);
          lastRanRef.current = Date.now();
        }, delay - (now - lastRanRef.current));
      }
    },
    [func, delay]
  );
};

