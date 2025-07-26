'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '@/lib/utils/error-handling';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class StorageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error);
    console.error('Uncaught error in StorageErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
          <h2 className="text-lg font-bold">Storage Error</h2>
          <p>
            Could not save or load your progress. Please check your browser
            settings and try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default StorageErrorBoundary;
