import React, { useState, useMemo } from 'react';
import { useReaderStore } from '@/stores/useReaderStore';
import { HighlightMarker } from './HighlightMarker';
import type { Highlight } from '@/types/data-models';

interface GroupedHighlights {
  [key: string]: Highlight[];
}

export const HighlightContainer: React.FC = () => {
  const highlights = useReaderStore((state) => state.optimisticHighlights);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(
    null,
  );

  const groupedHighlights = useMemo(() => {
    return highlights.reduce((acc: GroupedHighlights, highlight: Highlight) => {
      const { elementId } = highlight;
      if (!acc[elementId]) {
        acc[elementId] = [];
      }
      acc[elementId].push(highlight);
      return acc;
    }, {} as GroupedHighlights);
  }, [highlights]);

  const handleMouseEnter = (id: string) => {
    setActiveHighlightId(id);
  };

  const handleMouseLeave = () => {
    setActiveHighlightId(null);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {Object.values(groupedHighlights).map((group, groupIndex) =>
        group.map((highlight, highlightIndex) => (
          <HighlightMarker
            key={highlight.id}
            highlight={highlight}
            onMouseEnter={() => handleMouseEnter(highlight.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveHighlightId(highlight.id)}
            showTooltip={activeHighlightId === highlight.id}
            zIndex={groupIndex * 10 + highlightIndex}
          />
        )),
      )}
    </div>
  );
};
