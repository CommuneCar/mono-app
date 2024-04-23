import { IconButton, styled } from '@mui/material';

const Page = styled('div')(() => ({
  top: 0,
  left: 0,
  margin: 0,
  float: 'left',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
}));

const BottomDrawer = styled('div')(() => ({
  overflow: 'auto',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  transition: 'ease-in-out',
  border: 'solid 1px lightgrey',
}));

const MainMenuButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  right: 10,
  borderRadius: 5,
  backgroundColor: 'white',
}));

export { Page, BottomDrawer, MainMenuButton };
