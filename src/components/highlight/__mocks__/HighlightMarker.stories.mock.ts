export const mockHighlight = {
  id: 'highlight-1',
  chapterId: 'chapter-1',
  elementId: 'p1',
  text: 'This is a highlighted text.',
  color: 'yellow' as 'yellow' | 'red' | 'blue' | 'green',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockGetBoundingClientRect = () => ({
  left: 10,
  top: 20,
  width: 100,
  height: 50,
  x: 10,
  y: 20,
  right: 110,
  bottom: 70,
  toJSON: () => ({}),
});
