import { Box } from '@mui/material';
import React, {
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react';

import {
  BottomSheetBase,
  BottomSheetHandle,
  BottomSheetContent,
} from './styles';

const BottomDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const contentElement = document.querySelector('.bottom-sheet-content');
    const scrollTop = contentElement?.scrollTop ?? 0;
    const scrollHeight = contentElement?.scrollHeight ?? 0;
    const clientHeight = contentElement?.clientHeight ?? 0;
    const triggerPoint = scrollHeight - clientHeight * 2.5; // Change the percentage as needed

    if (scrollTop === 0 && isOpen) {
      setIsOpen(false);
      return;
    }

    if (scrollTop > triggerPoint) {
      setIsOpen(true);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    const contentElement = document.querySelector('.bottom-sheet-content');
    contentElement?.addEventListener('scroll', handleScroll);
    return () => contentElement?.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BottomSheetBase open={isOpen}>
      <Box onClick={toggleBottomSheet}>
        <BottomSheetHandle />
      </Box>
      <BottomSheetContent className={'bottom-sheet-content'}>
        {children}
      </BottomSheetContent>
    </BottomSheetBase>
  );
};

export { BottomDrawer };
