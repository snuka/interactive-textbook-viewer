import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Highlight } from '@/types/data-models';
import { toast } from 'sonner';

interface ReaderState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  currentChapter: string;
  isSidebarOpen: boolean;
  isNotesPanelOpen: boolean;
  goToChapter: (chapter: string) => void;
  toggleSidebar: () => void;
  toggleNotesPanel: () => void;
  highlights: Highlight[];
  optimisticHighlights: Highlight[];
  setHighlights: (highlights: Highlight[]) => void;
  addHighlight: (highlight: Highlight) => void;
  updateHighlight: (highlight: Highlight) => void;
  deleteHighlight: (highlightId: string) => void;
  loadHighlights: (chapter: string) => void;
}

const getStorageKey = (chapter: string) => `highlights-${chapter}`;

export const useReaderStore = create<ReaderState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      currentChapter: 'chapter-1',
      isSidebarOpen: true,
      isNotesPanelOpen: false,
      goToChapter: (chapter) => {
        set({ currentChapter: chapter });
        get().loadHighlights(chapter);
      },
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleNotesPanel: () =>
        set((state) => ({ isNotesPanelOpen: !state.isNotesPanelOpen })),
      highlights: [],
      optimisticHighlights: [],
      setHighlights: (highlights) =>
        set({ highlights, optimisticHighlights: highlights }),
      loadHighlights: (chapter) => {
        try {
          const storageKey = getStorageKey(chapter);
          const savedHighlights = localStorage.getItem(storageKey);
          if (savedHighlights) {
            set({ highlights: JSON.parse(savedHighlights) });
          } else {
            set({ highlights: [] });
          }
        } catch (error) {
          console.error('Failed to load highlights from storage:', error);
          toast.error('Could not load your saved highlights for this chapter.');
          set({ highlights: [] });
        }
      },
      addHighlight: (highlight) => {
        const currentHighlights = get().highlights;
        const optimisticState = [...currentHighlights, highlight];
        set({ optimisticHighlights: optimisticState });

        try {
          const storageKey = getStorageKey(highlight.chapterId);
          localStorage.setItem(storageKey, JSON.stringify(optimisticState));
          set({ highlights: optimisticState });
        } catch (error) {
          console.error('Failed to save highlight:', error);
          toast.error(
            'Failed to save highlight. Your changes may not persist.',
            {
              action: {
                label: 'Retry',
                onClick: () => get().addHighlight(highlight),
              },
            },
          );
          set({ optimisticHighlights: currentHighlights });
        }
      },
      updateHighlight: (updatedHighlight) => {
        const currentHighlights = get().highlights;
        const optimisticState = currentHighlights.map((h) =>
          h.id === updatedHighlight.id ? updatedHighlight : h,
        );
        set({ optimisticHighlights: optimisticState });

        try {
          const storageKey = getStorageKey(updatedHighlight.chapterId);
          localStorage.setItem(storageKey, JSON.stringify(optimisticState));
          set({ highlights: optimisticState });
          toast.success('Highlight updated!');
        } catch (error) {
          console.error('Failed to update highlight:', error);
          toast.error('Failed to update highlight. Please try again.', {
            action: {
              label: 'Retry',
              onClick: () => get().updateHighlight(updatedHighlight),
            },
          });
          set({ optimisticHighlights: currentHighlights });
        }
      },
      deleteHighlight: (highlightId) => {
        const currentHighlights = get().highlights;
        const highlightToDelete = currentHighlights.find(
          (h) => h.id === highlightId,
        );
        if (!highlightToDelete) return;

        const optimisticState = currentHighlights.filter(
          (h) => h.id !== highlightId,
        );
        set({ optimisticHighlights: optimisticState });

        try {
          const storageKey = getStorageKey(highlightToDelete.chapterId);
          localStorage.setItem(storageKey, JSON.stringify(optimisticState));
          set({ highlights: optimisticState });
          toast.success('Highlight removed.');
        } catch (error) {
          console.error(
            'Could not delete highlight. Your changes may not persist.',
            {
              action: {
                label: 'Retry',
                onClick: () => get().deleteHighlight(highlightId),
              },
            },
          );
          set({ optimisticHighlights: currentHighlights });
        }
      },
    }),
    {
      name: 'reader-store',
      partialize: (state) => ({
        theme: state.theme,
        currentChapter: state.currentChapter,
        isSidebarOpen: state.isSidebarOpen,
        isNotesPanelOpen: state.isNotesPanelOpen,
      }),
    },
  ),
);

export const useCurrentChapter = () =>
  useReaderStore((state) => state.currentChapter);
export const useIsSidebarOpen = () =>
  useReaderStore((state) => state.isSidebarOpen);
export const useTheme = () =>
  useReaderStore((state) => ({ theme: state.theme, setTheme: state.setTheme }));
