'use client';
import React, { useState } from 'react';
import type { Chapter } from '@/types/data-models';
import TableOfContents from '@/components/navigation/TableOfContents';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import ReadingProgress from '@/components/navigation/ReadingProgress';
import ChapterNavigation from '@/components/navigation/ChapterNavigation';
import SkipToContent from '@/components/shared/SkipToContent';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useNoteShortcuts } from '@/hooks/useNoteShortcuts';
import { useHighlights } from '@/hooks/useHighlights';
import { KeyboardShortcutsModal } from '@/components/shared/KeyboardShortcutsModal';
import { HighlightContainer } from '@/components/highlight/HighlightContainer';
import { useReaderStore } from '@/stores/useReaderStore';
import { NotesSidebar } from '@/components/notes/NotesSidebar';
import { PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ReaderLayoutProps = {
  chapters: Chapter[];
  currentChapterId: string;
  children: React.ReactNode;
};

const ReaderLayout: React.FC<ReaderLayoutProps> = ({
  chapters,
  currentChapterId,
  children,
}) => {
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const { isNotesPanelOpen, toggleNotesPanel } = useReaderStore();
  const currentChapter = chapters.find((c) => c.id === currentChapterId);
  useHighlights();
  useNoteShortcuts();
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: currentChapter?.title ?? 'Chapter', href: `/${currentChapterId}` },
  ];

  const shortcuts = [
    {
      key: '?',
      callback: () => setIsShortcutsModalOpen(true),
    },
    {
      key: 'Escape',
      callback: () => setIsShortcutsModalOpen(false),
    },
  ];

  useKeyboardShortcuts({ shortcuts });

  return (
    <>
      <div className="flex h-screen">
        <SkipToContent contentId="main-content" />
        <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
          <nav aria-label="Table of Contents">
            <TableOfContents
              chapters={chapters}
              currentChapterId={currentChapterId}
            />
          </nav>
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="p-4 bg-white border-b">
            <ReadingProgress />
            <div className="flex justify-between items-center">
              <nav aria-label="Breadcrumb">
                <Breadcrumbs items={breadcrumbItems} />
              </nav>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleNotesPanel}
                  aria-label="Toggle Notes Panel"
                >
                  <PanelRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </header>
          <main
            id="main-content"
            tabIndex={-1}
            className="relative flex-1 overflow-y-auto p-8 focus:outline-none"
          >
            <article className="prose max-w-none">{children}</article>
            <HighlightContainer />
            <nav aria-label="Chapter Navigation">
              <ChapterNavigation
                chapters={chapters}
                currentChapterId={currentChapterId}
              />
            </nav>
          </main>
        </div>
        {isNotesPanelOpen && <NotesSidebar />}
      </div>
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </>
  );
};

export default ReaderLayout;
