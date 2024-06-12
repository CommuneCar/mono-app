import { GlobalStyles, Theme } from '@mui/material';

const globalStyles = (
  <GlobalStyles
    styles={(theme: Theme) => ({
      '*::-webkit-scrollbar': {
        width: '12px',
      },
      '*::-webkit-scrollbar-track': {
        background: theme.palette.grey[300],
        borderRadius: '10px',
      },
      '*::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '10px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.dark,
      },
    })}
  />
);

export default globalStyles;
