import React, { memo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const VirtualizedList = memo(<T,>({
  items,
  height,
  itemHeight,
  renderItem
}: VirtualizedListProps<T>) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      {renderItem(items[index], index)}
    </div>
  );

  return (
    <AutoSizer>
      {({ width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={items.length}
          itemSize={itemHeight}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
});

VirtualizedList.displayName = 'VirtualizedList'; 