import { useState, useEffect } from 'react';

interface UseCountUpOptions {
  duration?: number; // duration in ms
  decimals?: number; // decimal places
  start?: number;
}

export function useCountUp(
  endValue: number,
  options: UseCountUpOptions = {}
): number {
  const { duration = 1500, decimals = 0, start = 0 } = options;
  const [count, setCount] = useState<number>(start);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const current = start + (endValue - start) * easedProgress;

      if (decimals > 0) {
        setCount(parseFloat(current.toFixed(decimals)));
      } else {
        setCount(Math.round(current));
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [endValue, duration, decimals, start]);

  return count;
}
