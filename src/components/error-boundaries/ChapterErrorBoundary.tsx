'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CustomError, logError } from '@/lib/utils/error-handling';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ChapterErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error);
    console.error('Uncaught error in ChapterErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage =
        'An unexpected error occurred while loading the chapter.';
      if (this.state.error instanceof CustomError) {
        errorMessage = this.state.error.message;
      } else if (this.state.error) {
        errorMessage = this.state.error.message;
      }

      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <h2 className="text-lg font-bold">Chapter Error</h2>
          <p>{errorMessage}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChapterErrorBoundary;
