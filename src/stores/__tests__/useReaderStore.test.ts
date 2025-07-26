import { renderHook, act } from '@testing-library/react';
import { useReaderStore } from '../useReaderStore';

describe('useReaderStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useReaderStore.setState({
        currentChapter: 'chapter-1',
        isSidebarOpen: true,
      });
    });
  });

  it('should go to a new chapter', () => {
    const { result } = renderHook(() => useReaderStore());

    act(() => {
      result.current.goToChapter('chapter-2');
    });

    expect(result.current.currentChapter).toBe('chapter-2');
  });

  it('should toggle the sidebar', () => {
    const { result } = renderHook(() => useReaderStore());

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isSidebarOpen).toBe(false);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isSidebarOpen).toBe(true);
  });
});
