import { useEffect } from 'react';
import { useReaderStore } from '@/stores/useReaderStore';

export const useHighlights = () => {
  const addHighlight = useReaderStore((state) => state.addHighlight);
  const currentChapter = useReaderStore((state) => state.currentChapter);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        return;
      }

      const selectedText = selection.toString().trim();
      if (selectedText.length === 0) {
        return;
      }

      const range = selection.getRangeAt(0);
      let parentElement = range.commonAncestorContainer.parentElement;

      // Traverse up to find a parent with an ID
      while (parentElement && !parentElement.id) {
        parentElement = parentElement.parentElement;
      }

      if (parentElement && parentElement.id) {
        addHighlight({
          id: crypto.randomUUID(),
          chapterId: currentChapter,
          elementId: parentElement.id,
          text: selectedText,
          color: 'yellow',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      selection.removeAllRanges();
    };

    document.addEventListener('mouseup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, [addHighlight, currentChapter]);
};
