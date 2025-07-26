import { create } from 'zustand';
import { Editor } from '@tiptap/react';

interface EditorState {
  editor: Editor | null;
  selection: { from: number; to: number } | null;
  setEditor: (editor: Editor | null) => void;
  setSelection: (selection: { from: number; to: number } | null) => void;
  saveContent: () => void;
  loadContent: () => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  editor: null,
  selection: null,
  setEditor: (editor) => set({ editor }),
  setSelection: (selection) => set({ selection }),
  saveContent: () => {
    const { editor } = useEditorStore.getState();
    if (editor) {
      localStorage.setItem('editorContent', JSON.stringify(editor.getJSON()));
    }
  },
  loadContent: () => {
    const { editor } = useEditorStore.getState();
    if (editor) {
      const content = localStorage.getItem('editorContent');
      if (content) {
        editor.commands.setContent(JSON.parse(content));
      }
    }
  },
}));
