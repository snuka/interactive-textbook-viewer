import React, { useRef, useEffect } from 'react';

type FocusTrapProps = {
  children: React.ReactNode;
  isActive: boolean;
};

const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive }) => {
  const trapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && trapRef.current) {
      const focusableElements = trapRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isActive]);

  return (
    <div ref={trapRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
};

export default FocusTrap;
