'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface ChapterNavigationProps {
  currentChapterId: string;
  chapters: { id: string; title: string }[];
}

const ChapterNavigation = ({
  currentChapterId,
  chapters,
}: ChapterNavigationProps) => {
  const router = useRouter();
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.id === currentChapterId,
  );
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const shortcuts = [
    {
      key: 'ArrowLeft',
      callback: () => {
        if (prevChapter) {
          router.push(`/${prevChapter.id}`);
        }
      },
    },
    {
      key: 'ArrowRight',
      callback: () => {
        if (nextChapter) {
          router.push(`/${nextChapter.id}`);
        }
      },
    },
  ];

  useKeyboardShortcuts({ shortcuts });

  return (
    <div className="flex justify-between mt-8">
      <div>
        {prevChapter ? (
          <Button asChild>
            <Link href={`/${prevChapter.id}`} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {prevChapter.title}
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
      <div>
        {nextChapter && (
          <Button asChild>
            <Link href={`/${nextChapter.id}`} className="flex items-center">
              {nextChapter.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChapterNavigation;
