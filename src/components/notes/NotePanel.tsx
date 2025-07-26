'use client';

import React, { useState, useEffect } from 'react';
import { Note } from '@/types/notes';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { Button } from '@/components/ui/button';

interface NotePanelProps {
  note: Note | null;
  onSave: (noteId: string, content: string) => void;
  onClose: () => void;
}

export const NotePanel: React.FC<NotePanelProps> = ({
  note,
  onSave,
  onClose,
}) => {
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setContent(note?.content || '');
  }, [note]);

  const handleSave = () => {
    if (note) {
      onSave(note.id, content);
    } else {
      // This case should ideally be handled by a more robust state management
      // For now, we'll assume a note object is always present when the panel is open
    }
    onClose();
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Note for Highlight</h2>
        <TiptapEditor content={content} onContentChange={handleContentChange} />
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
