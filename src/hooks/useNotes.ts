import { useState, useCallback } from 'react';
import { Note } from '@/types/notes';
import { v4 as uuidv4 } from 'uuid';

export const useNotes = (initialNotes: Note[] = []) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');

  const addNote = useCallback((highlightId: string, content: string) => {
    const newNote: Note = {
      id: uuidv4(),
      highlightId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }, []);

  const updateNote = useCallback((noteId: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, content, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    notes: filteredNotes,
    addNote,
    updateNote,
    deleteNote,
    setSearchTerm,
  };
};
