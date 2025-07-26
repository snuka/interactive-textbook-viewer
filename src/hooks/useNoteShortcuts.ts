import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { useReaderStore } from '@/stores/useReaderStore';

export const useNoteShortcuts = () => {
  const { toggleNotesPanel } = useReaderStore();

  const shortcuts = [
    {
      key: 'alt+n',
      callback: () => toggleNotesPanel(),
    },
    // Add more note-specific shortcuts here
  ];

  useKeyboardShortcuts({ shortcuts });
};
