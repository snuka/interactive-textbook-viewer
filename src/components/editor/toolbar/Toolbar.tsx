import { Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Minus,
  Highlighter,
} from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';
import { Separator } from '../../ui/separator';

type Props = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const handleHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  return (
    <div className="border border-input bg-transparent rounded-br-md">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <div className="flex items-center">
        <Highlighter className="h-4 w-4 ml-2" />
        <button
          className="h-4 w-4 rounded-full bg-yellow-300 ml-2"
          onClick={() => handleHighlight('var(--yellow-light)')}
          aria-label="Highlight Yellow"
        />
        <button
          className="h-4 w-4 rounded-full bg-blue-300 ml-2"
          onClick={() => handleHighlight('var(--blue-light)')}
          aria-label="Highlight Blue"
        />
        <button
          className="h-4 w-4 rounded-full bg-pink-300 ml-2"
          onClick={() => handleHighlight('var(--pink-light)')}
          aria-label="Highlight Pink"
        />
        <button
          className="h-4 w-4 rounded-full bg-green-300 ml-2"
          onClick={() => handleHighlight('var(--green-light)')}
          aria-label="Highlight Green"
        />
      </div>
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size="sm"
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
