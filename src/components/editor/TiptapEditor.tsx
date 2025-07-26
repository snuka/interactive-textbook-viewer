'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HighlightExtension } from './extensions/HighlightExtension';
import { useEditorStore } from '@/stores/useEditorStore';
import { Toolbar } from './toolbar/Toolbar';

interface TiptapEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onContentChange,
}) => {
  const setEditor = useEditorStore((state) => state.setEditor);
  const setSelection = useEditorStore((state) => state.setSelection);
  const saveContent = useEditorStore((state) => state.saveContent);
  const loadContent = useEditorStore((state) => state.loadContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      HighlightExtension.configure({ multicolor: true }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      setSelection({ from, to });
    },
    onTransaction: () => {
      saveContent();
    },
  });

  useEffect(() => {
    if (editor) {
      setEditor(editor);
      loadContent();
    }
  }, [editor, setEditor, loadContent]);

  return (
    <>
      <EditorContent editor={editor} />
      {editor && <Toolbar editor={editor} />}
    </>
  );
};

export default TiptapEditor;
