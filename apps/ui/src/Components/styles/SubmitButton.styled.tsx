import styled from 'styled-components';
import defaultTheme from '../../themes/default';
import { Button } from '@mui/material';

const SubmitButton = styled(Button)`
  background-color: ${defaultTheme.palette.primary.main};
  color: ${defaultTheme.palette.primary.contrastText};

  &:hover {
    background-color: ${defaultTheme.palette.action.hoverOpacity};
    color: ${defaultTheme.palette.primary.main};
  }
`;

export { SubmitButton };
