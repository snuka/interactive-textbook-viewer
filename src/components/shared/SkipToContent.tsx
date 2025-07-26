import React from 'react';

type SkipToContentProps = {
  contentId: string;
};

const SkipToContent: React.FC<SkipToContentProps> = ({ contentId }) => {
  const handleSkip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const content = document.getElementById(contentId);
    if (content) {
      content.focus();
      // Smooth scroll to the content
      content.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${contentId}`}
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
