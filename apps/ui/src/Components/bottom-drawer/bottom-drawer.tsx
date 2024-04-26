import React, { useState, useEffect, PropsWithChildren } from 'react';

import './BottomSheet.css';

const BottomDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.querySelector('.bottom-sheet-content');
      const scrollTop = contentElement?.scrollTop ?? 0;
      const scrollHeight = contentElement?.scrollHeight ?? 0;
      const clientHeight = contentElement?.clientHeight ?? 0;
      const triggerPoint = scrollHeight - clientHeight * 2.5; // Change the percentage as needed

      if (scrollTop > triggerPoint) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    const contentElement = document.querySelector('.bottom-sheet-content');
    contentElement?.addEventListener('scroll', handleScroll);
    return () => contentElement?.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
      <div onClick={toggleBottomSheet}>
        <div className="bottom-sheet-handle" />
      </div>
      <div className="bottom-sheet-content">{children}</div>
    </div>
  );
};

export { BottomDrawer };
