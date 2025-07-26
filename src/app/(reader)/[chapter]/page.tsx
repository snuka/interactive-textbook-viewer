import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';

import ReaderLayout from '@/components/reader-layout/ReaderLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchChapters, fetchChapterContent } from '@/lib/utils/api';

async function ChapterContent({ chapterId }: { chapterId: string }) {
  const chapterHtml = await fetchChapterContent(chapterId);
  if (!chapterHtml) {
    notFound();
  }
  const sanitizedHtml = DOMPurify.sanitize(chapterHtml);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}

export default async function ChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const chapters = await fetchChapters();
  if (!chapters) {
    return <div>Failed to load chapters.</div>;
  }

  return (
    <ReaderLayout chapters={chapters} currentChapterId={params.chapter}>
      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        }
      >
        <ChapterContent chapterId={params.chapter} />
      </Suspense>
    </ReaderLayout>
  );
}
