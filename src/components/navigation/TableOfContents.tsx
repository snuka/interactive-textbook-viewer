'use client';

import Link from 'next/link';
import { Book } from 'lucide-react';

import type { Chapter } from '@/types/data-models';
import { useReaderStore } from '@/stores/useReaderStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface TableOfContentsProps {
  chapters: Chapter[];
  currentChapterId: string;
}

const TableOfContents = ({
  chapters,
  currentChapterId,
}: TableOfContentsProps) => {
  const { isSidebarOpen, toggleSidebar } = useReaderStore();

  const shortcuts = [
    {
      key: 'Escape',
      callback: () => {
        if (isSidebarOpen) {
          toggleSidebar();
        }
      },
    },
  ];

  useKeyboardShortcuts({ shortcuts });

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <aside className="w-64 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link
                href={`/${chapter.id}`}
                className={`flex items-center p-2 rounded-md ${
                  currentChapterId === chapter.id ? 'bg-gray-200' : ''
                }`}
              >
                <Book className="w-4 h-4 mr-2" />
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default TableOfContents;
