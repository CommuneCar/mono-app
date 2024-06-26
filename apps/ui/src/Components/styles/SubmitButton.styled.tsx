import defaultTheme from '../../themes/default';
import { Button, styled } from '@mui/material';

const SubmitButton = styled(Button)`
  background-color: ${defaultTheme.palette.primary.main};
  color: ${defaultTheme.palette.primary.contrastText};

  &:hover {
    background-color: ${defaultTheme.palette.action.hoverOpacity};
    color: ${defaultTheme.palette.primary.main};
  }

  &.Mui-disabled {
    background-color: ${defaultTheme.palette.action.disabledBackground};
    color: ${defaultTheme.palette.action.disabled};
  }
`;

export { SubmitButton };
