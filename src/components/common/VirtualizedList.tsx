import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

interface VirtualizedListProps<T> {
  items: T[];
  height?: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
}: VirtualizedListProps<T>) {
  return (
    <div style={{ height: height || '100%', width: '100%' }}>
      <AutoSizer>
        {({ height: autoHeight, width }) => (
          <FixedSizeList
            height={autoHeight}
            width={width}
            itemCount={items.length}
            itemSize={itemHeight}
          >
            {({ index, style }) => {
              const item = items[index];
              if (!item) return null;
              return (
                <div style={style}>
                  {renderItem(item, index)}
                </div>
              );
            }}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

VirtualizedList.displayName = 'VirtualizedList'; 