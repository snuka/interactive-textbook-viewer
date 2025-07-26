import React from 'react';
import FocusTrap from './FocusTrap';
import { Button } from '@/components/ui/button';

// Define the props for the KeyboardShortcutsModal component
type KeyboardShortcutsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Define the keyboard shortcuts to be displayed in the modal
const shortcuts = [
  { key: '←', description: 'Previous Chapter' },
  { key: '→', description: 'Next Chapter' },
  { key: 'Esc', description: 'Close Panel/Modal' },
  { key: '?', description: 'Show Keyboard Shortcuts' },
];

/**
 * A modal component that displays a list of available keyboard shortcuts.
 * It uses a FocusTrap to keep focus within the modal when it is open.
 *
 * @param {KeyboardShortcutsModalProps} props - The props for the component.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @returns {React.ReactElement | null} The rendered modal or null if it is not open.
 */
export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="keyboard-shortcuts-title"
      role="dialog"
      aria-modal="true"
    >
      <FocusTrap isActive={isOpen}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 id="keyboard-shortcuts-title" className="text-xl font-bold">
              Keyboard Shortcuts
            </h2>
            <Button
              onClick={onClose}
              aria-label="Close keyboard shortcuts modal"
              className="text-gray-500 hover:text-gray-800"
              variant="ghost"
              size="sm"
              tabIndex={0}
            >
              &times;
            </Button>
          </div>
          <ul className="space-y-2">
            {shortcuts.map((shortcut) => (
              <li key={shortcut.key} className="flex justify-between">
                <span>{shortcut.description}</span>
                <kbd className="bg-gray-200 px-2 py-1 rounded-md text-sm font-mono">
                  {shortcut.key}
                </kbd>
              </li>
            ))}
          </ul>
        </div>
      </FocusTrap>
    </div>
  );
};
