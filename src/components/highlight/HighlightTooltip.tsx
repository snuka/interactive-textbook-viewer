import React from 'react';
import type { Highlight } from '@/types/data-models';
import { useReaderStore } from '@/stores/useReaderStore';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HighlightTooltipProps {
  highlight: Highlight;
  markerRef: React.RefObject<HTMLDivElement>;
}

export const HighlightTooltip: React.FC<HighlightTooltipProps> = ({
  highlight,
  markerRef,
}) => {
  const { deleteHighlight, updateHighlight } = useReaderStore();

  const handleDelete = () => {
    deleteHighlight(highlight.id);
  };

  const handleChangeColor = (color: 'yellow' | 'red' | 'blue' | 'green') => {
    updateHighlight({ ...highlight, color });
  };

  const markerRect = markerRef.current?.getBoundingClientRect();

  if (!markerRect) return null;

  return (
    <motion.div
      data-testid="highlight-tooltip"
      role="tooltip"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 p-2 bg-white border rounded-lg shadow-lg -top-14"
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChangeColor('yellow')}
          className="w-6 h-6 p-0 bg-yellow-300 rounded-full hover:bg-yellow-400"
          aria-label="Change highlight to yellow"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChangeColor('red')}
          className="w-6 h-6 p-0 bg-red-300 rounded-full hover:bg-red-400"
          aria-label="Change highlight to red"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChangeColor('blue')}
          className="w-6 h-6 p-0 bg-blue-300 rounded-full hover:bg-blue-400"
          aria-label="Change highlight to blue"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChangeColor('green')}
          className="w-6 h-6 p-0 bg-green-300 rounded-full hover:bg-green-400"
          aria-label="Change highlight to green"
        />
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="ml-2"
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
};
