import { useEffect } from 'react';

// Define the type for the keyboard shortcuts configuration
type KeyboardShortcut = {
  key: string; // The key to press, e.g., 'ArrowLeft', 'Escape'
  ctrlKey?: boolean; // Whether the Ctrl key should be pressed
  shiftKey?: boolean; // Whether the Shift key should be pressed
  altKey?: boolean; // Whether the Alt key should be pressed
  callback: () => void; // The function to call when the shortcut is triggered
};

// Define the props for the hook
type UseKeyboardShortcutsProps = {
  shortcuts: KeyboardShortcut[]; // An array of shortcut configurations
};

/**
 * A custom hook to handle keyboard shortcuts.
 * It adds a 'keydown' event listener to the window and triggers the corresponding callback
 * when a configured shortcut is pressed.
 *
 * @param {UseKeyboardShortcutsProps} props - The props for the hook.
 * @param {KeyboardShortcut[]} props.shortcuts - An array of shortcut configurations.
 */
export const useKeyboardShortcuts = ({
  shortcuts,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key === event.key &&
          !!s.ctrlKey === event.ctrlKey &&
          !!s.shiftKey === event.shiftKey &&
          !!s.altKey === event.altKey,
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};
