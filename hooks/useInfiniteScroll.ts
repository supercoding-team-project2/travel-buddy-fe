import { useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from 'react';

interface InfiniteScrollReturn {
  scrollRef: RefObject<HTMLDivElement>;
  isFetching: boolean;
  setIsFetching: (state: boolean) => void;
}

function useInfiniteScroll(callback: () => void): InfiniteScrollReturn {
  const [isFetching, setIsFetching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollTop === 0 && !isFetching) {
        setIsFetching(true);
        callback();
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching, callback]);

  useEffect(() => {
    if (!isFetching) return;
    setIsFetching(false);
  }, [isFetching]);

  return { scrollRef, isFetching, setIsFetching };
}

export default useInfiniteScroll;
