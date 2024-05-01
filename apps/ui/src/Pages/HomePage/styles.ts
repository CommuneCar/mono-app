import { Box, IconButton, styled } from '@mui/material';

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
}));

export { Page, MainMenuButton };
