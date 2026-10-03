import { useState, useEffect } from 'react';

/**
 * Returns a time-based greeting according to current hour (0-23):
 * 5 <= hour < 12: "Good morning"
 * 12 <= hour < 17: "Good afternoon"
 * 17 <= hour < 21: "Good evening"
 * 21 <= hour < 24: "Good night"
 * 0 <= hour < 5: "Working late"
 */
export function getTimeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening';
  } else if (hour >= 21 && hour < 24) {
    return 'Good night';
  } else {
    // 0 <= hour < 5
    return 'Working late';
  }
}

export function useGreeting(): string {
  const [greeting, setGreeting] = useState<string>(() => getTimeGreeting());

  useEffect(() => {
    const update = () => {
      setGreeting(getTimeGreeting());
    };

    // Update greeting every 60 seconds
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return greeting;
}

export default useGreeting;
