import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Highlight } from '@/types/data-models';
import { cn } from '@/lib/utils';
import { HighlightTooltip } from './HighlightTooltip';

interface HighlightMarkerProps {
  highlight: Highlight;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  showTooltip: boolean;
  zIndex: number;
}

const highlightColorStyles = {
  yellow: 'bg-yellow-300/50',
  red: 'bg-red-300/50',
  blue: 'bg-blue-300/50',
  green: 'bg-green-300/50',
};

export const HighlightMarker: React.FC<HighlightMarkerProps> = ({
  highlight,
  onMouseEnter,
  onMouseLeave,
  onClick,
  showTooltip,
  zIndex,
}) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const targetElement = document.getElementById(highlight.elementId);
    if (!targetElement) return;

    const updateRect = () => {
      setRect(targetElement.getBoundingClientRect());
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(targetElement);

    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateRect);
    };
  }, [highlight.elementId]);

  if (!rect) return null;

  return (
    <motion.div
      role="button"
      ref={markerRef}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn(
        'absolute rounded-md',
        highlightColorStyles[highlight.color],
      )}
      style={{
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.top + window.scrollY}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {showTooltip && (
        <HighlightTooltip highlight={highlight} markerRef={markerRef} />
      )}
    </motion.div>
  );
};
