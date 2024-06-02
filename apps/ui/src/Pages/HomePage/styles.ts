import { Box, Card, IconButton, styled } from '@mui/material';

const Page = styled(Box)(() => ({
  top: 0,
  left: 0,
  margin: 0,
  float: 'left',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
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
  left: 280,
  zIndex: 20,
  height: '85%',
  width: '25%',
  borderRadius: '8px',
  position: 'absolute',
}));

export { Page, MainMenuButton, PageCard };
