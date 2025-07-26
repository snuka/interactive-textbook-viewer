import { Chapter } from '@/types/data-models';
import path from 'path';
import { promises as fs } from 'fs';

/**
 * Type for the raw chapter data loaded from the JSON file.
 */
type RawChapter = {
  id: string;
  title: string;
  description: string;
  html_file: string;
};

/**
 * Loads all chapter metadata from the static JSON file.
 * @returns A promise that resolves to an array of Chapter objects.
 */
export const fetchChapters = async (): Promise<Chapter[]> => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'chapters.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const chaptersData: RawChapter[] = JSON.parse(fileContent);

  const chapters: Chapter[] = chaptersData.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    description: chapter.description,
    htmlFilePath: chapter.html_file,
  }));

  return chapters;
};

/**
 * Loads a single chapter by its ID.
 * @param id The ID of the chapter to load.
 * @returns A promise that resolves to the Chapter object, or null if not found.
 */
export const getChapterById = async (id: string): Promise<Chapter | null> => {
  const chapters = await fetchChapters();
  const chapter = chapters.find((c) => c.id === id);
  return chapter || null;
};

/**
 * Loads the HTML content of a chapter.
 * @param htmlFilePath The relative path to the chapter's HTML file.
 * @returns A promise that resolves to the HTML content as a string.
 */
export const fetchChapterContent = async (
  chapterId: string,
): Promise<string | null> => {
  const chapter = await getChapterById(chapterId);
  if (!chapter) {
    return null;
  }
  const filePath = path.join(process.cwd(), 'public', chapter.htmlFilePath);
  const htmlContent = await fs.readFile(filePath, 'utf-8');
  return htmlContent;
};
