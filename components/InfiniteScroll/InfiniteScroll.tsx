import React, { useState, useEffect, useRef } from 'react';

export function InfiniteScroll({
  data,
  renderItem,
}: {
  data: any[];
  renderItem: (item: any, index: number) => JSX.Element;
}) {
  const [isUpdateList, setIsUpdateList] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const onScrollList = async () => {
    if (!isUpdateList || !listRef.current) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    const endPoint = 100;

    if (scrollTop + clientHeight + endPoint >= scrollHeight) {
      setIsUpdateList(false);
      // 로직 처리
    }
  };

  useEffect(() => {
    const handleScroll = () => onScrollList();
    const listElement = listRef.current;

    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isUpdateList]);

  useEffect(() => {
    setIsUpdateList(true);
  }, [data]);

  return (
    <div ref={listRef} style={{ height: '100vh', overflowY: 'auto' }}>
      {data.map((item, index) => renderItem(item, index))}
    </div>
  );
}
