/**
 * Represents the metadata for a single chapter.
 */
export interface Chapter {
  id: string;
  title: string;
  htmlFilePath: string;
  description: string;
}

/**
 * Represents a user-created highlight in the textbook.
 */
export interface Highlight {
  id: string;
  chapterId: string;
  elementId: string; // The ID of the HTML element that is highlighted
  text: string;
  color: 'yellow' | 'red' | 'blue' | 'green';
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

/**
 * Represents a user-created flashcard.
 */
export interface Flashcard {
  id: string;
  chapterId: string;
  question: string;
  answer: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

/**
 * Represents a message in the AI chat interface.
 */
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO 8601 date string
}
