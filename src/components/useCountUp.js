// src/components/useCountUp.js

import { useState, useEffect } from 'react';

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 100);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setCount(Math.round(start));
    }, 100);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

export default useCountUp;
