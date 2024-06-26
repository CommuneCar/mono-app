import { isMobile } from 'react-device-detect';
import { Box, Card, IconButton, styled } from '@mui/material';
import { COLORS } from '../../themes/default/consts';

const Page = styled(Box)(() => ({
  top: 0,
  left: 0,
  margin: 0,
  float: 'left',
  position: 'absolute',
  height: isMobile ? '100dvh' : '100%',
  width: isMobile ? '100dvw' : '100%',
  overflow: 'auto',
}));

const PageHeaderBar = styled(Box)(() => ({
  position: 'sticky',
  top: 0,
  zIndex: 20,
  backgroundColor: COLORS.WHITE,
  minHeight: '5%',
}));

const MainMenuButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  right: 10,
  borderRadius: 5,
  backgroundColor: 'white',
  zIndex: 10,
}));

const PageCard = styled(Card)(() => ({
  top: 100,
  left: 'min(42vh, 330px)',
  zIndex: 20,
  height: '80%',
  width: '25%',
  borderRadius: '8px',
  position: 'absolute',
  minWidth: 300,
  bottom: 0,
  overflow: 'auto',
}));

export { Page, MainMenuButton, PageCard, PageHeaderBar };
