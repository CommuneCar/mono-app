import { Box, styled } from '@mui/material';

const BottomSheetBase = styled(Box)<{ open: boolean }>(({ open, theme }) => ({
  zIndex: 10,
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: open ? '100%' : '34%',
  backgroundColor: theme.palette.background.default,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[20],
  transition: 'height .3s ease',
  overflow: 'hidden',
}));

const BottomSheetHandle = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '6px',
  backgroundColor: theme.palette.grey[300],
  borderRadius: '3px',
  margin: '10px auto',
  cursor: 'pointer',
}));

const BottomSheetContent = styled(Box)(() => ({
  overflowY: 'auto',
  padding: '20px',
  height: 'calc(100% - 40px)',
}));

export { BottomSheetBase, BottomSheetContent, BottomSheetHandle };
