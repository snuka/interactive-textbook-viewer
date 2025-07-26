'use client';

import React from 'react';
import { NotesContainer } from './NotesContainer';

export const NotesSidebar = () => {
  return (
    <aside className="h-full w-full max-w-sm p-4 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <NotesContainer />
    </aside>
  );
};
