'use client';

import React, { useEffect, useState } from 'react';
import TiptapEditor from './TiptapEditor';

interface EditorOverlayProps {
  chapter: string;
}

const EditorOverlay: React.FC<EditorOverlayProps> = ({ chapter }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const response = await fetch(`/static-html/chapter-${chapter}.html`);
        const html = await response.text();
        setContent(html);
      } catch (error) {
        console.error('Failed to fetch chapter content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (chapter) {
      fetchChapterContent();
    }
  }, [chapter]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute inset-0">
      <TiptapEditor content={content} onContentChange={() => {}} />
    </div>
  );
};

export default EditorOverlay;
