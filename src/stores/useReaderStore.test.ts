import { renderHook, act } from '@testing-library/react';
import { useReaderStore } from './useReaderStore';
import { Highlight } from '@/types/data-models';
import { toast } from 'sonner';

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('useReaderStore - Highlight Persistence', () => {
  const mockHighlight: Highlight = {
    id: 'highlight-1',
    chapterId: 'chapter-1',
    elementId: 'p1',
    text: 'Test highlight text',
    color: 'yellow',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorage.clear();
    jest.clearAllMocks();
    act(() => {
      // Reset store to initial state
      useReaderStore.setState({
        highlights: [],
        optimisticHighlights: [],
        currentChapter: 'chapter-1',
        theme: 'light',
        isSidebarOpen: true,
        isNotesPanelOpen: false,
      });
    });
  });

  describe('addHighlight', () => {
    it('should add highlight to store and persist to localStorage', () => {
      const { result } = renderHook(() => useReaderStore());

      act(() => {
        result.current.addHighlight(mockHighlight);
      });

      expect(result.current.highlights).toHaveLength(1);
      expect(result.current.highlights[0]).toEqual(mockHighlight);

      const savedData = localStorage.getItem('highlights-chapter-1');
      expect(savedData).toBeTruthy();
      const parsedData = JSON.parse(savedData!);
      expect(parsedData).toHaveLength(1);
      expect(parsedData[0]).toEqual(mockHighlight);
    });

    it('should handle localStorage errors gracefully', () => {
      const { result } = renderHook(() => useReaderStore());

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const setItemSpy = jest
        .spyOn(window.localStorage, 'setItem')
        .mockImplementation(() => {
          throw new Error('QuotaExceededError');
        });

      act(() => {
        result.current.addHighlight(mockHighlight);
      });

      expect(toast.error).toHaveBeenCalled();
      expect(result.current.highlights).toHaveLength(0);
      expect(result.current.optimisticHighlights).toHaveLength(0);

      setItemSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('loadHighlights', () => {
    it('should load highlights from localStorage', () => {
      const { result } = renderHook(() => useReaderStore());

      const highlights = [mockHighlight];
      localStorage.setItem('highlights-chapter-1', JSON.stringify(highlights));

      act(() => {
        result.current.loadHighlights('chapter-1');
      });

      expect(result.current.highlights).toHaveLength(1);
      expect(result.current.highlights[0]).toEqual(mockHighlight);
    });

    it('should handle empty localStorage gracefully', () => {
      const { result } = renderHook(() => useReaderStore());

      act(() => {
        result.current.loadHighlights('chapter-2');
      });

      expect(result.current.highlights).toHaveLength(0);
    });

    it('should handle corrupted localStorage data', () => {
      const { result } = renderHook(() => useReaderStore());

      localStorage.setItem('highlights-chapter-1', 'invalid-json');

      act(() => {
        result.current.loadHighlights('chapter-1');
      });

      expect(result.current.highlights).toHaveLength(0);
      expect(toast.error).toHaveBeenCalledWith(
        'Could not load your saved highlights for this chapter.',
      );
    });
  });

  describe('updateHighlight', () => {
    it('should update highlight in store and localStorage', () => {
      const { result } = renderHook(() => useReaderStore());

      act(() => {
        result.current.addHighlight(mockHighlight);
      });

      const updatedHighlight = {
        ...mockHighlight,
        color: 'blue' as const,
        updatedAt: '2024-01-02T00:00:00.000Z',
      };

      act(() => {
        result.current.updateHighlight(updatedHighlight);
      });

      expect(result.current.highlights).toHaveLength(1);
      expect(result.current.highlights[0]).toEqual(updatedHighlight);

      const savedData = localStorage.getItem('highlights-chapter-1');
      expect(savedData).toBeTruthy();
      const parsedData = JSON.parse(savedData!);
      expect(parsedData[0]).toEqual(updatedHighlight);

      expect(toast.success).toHaveBeenCalledWith('Highlight updated!');
    });
  });

  describe('deleteHighlight', () => {
    it('should delete highlight from store and localStorage', () => {
      const { result } = renderHook(() => useReaderStore());

      const secondHighlight = { ...mockHighlight, id: 'highlight-2' };
      act(() => {
        result.current.addHighlight(mockHighlight);
        result.current.addHighlight(secondHighlight);
      });

      expect(result.current.highlights).toHaveLength(2);

      act(() => {
        result.current.deleteHighlight('highlight-1');
      });

      expect(result.current.highlights).toHaveLength(1);
      expect(result.current.highlights[0].id).toBe('highlight-2');

      const savedData = localStorage.getItem('highlights-chapter-1');
      expect(savedData).toBeTruthy();
      const parsedData = JSON.parse(savedData!);
      expect(parsedData).toHaveLength(1);
      expect(parsedData[0].id).toBe('highlight-2');

      expect(toast.success).toHaveBeenCalledWith('Highlight removed.');
    });
  });

  describe('goToChapter', () => {
    it('should change current chapter and load highlights', () => {
      const { result } = renderHook(() => useReaderStore());

      const chapter2Highlight = { ...mockHighlight, chapterId: 'chapter-2' };
      localStorage.setItem(
        'highlights-chapter-2',
        JSON.stringify([chapter2Highlight]),
      );

      act(() => {
        result.current.goToChapter('chapter-2');
      });

      expect(result.current.currentChapter).toBe('chapter-2');
      expect(result.current.highlights).toHaveLength(1);
      expect(result.current.highlights[0].chapterId).toBe('chapter-2');
    });
  });
});
