import { Box, styled } from '@mui/material';

const Header = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingTop: '1rem',
  paddingLeft: '2rem',
}));

export { Header };
