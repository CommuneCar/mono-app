import styled from 'styled-components';
import { Box } from '@mui/material';

const HeaderFeed = styled(Box)`
  position: fixed;
  top: 0;
  z-index: 1100;
  width: 100%;
  max-width: 400px; // Corrected from maxWidth to max-width for CSS
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 8px;
`;

export { HeaderFeed };
