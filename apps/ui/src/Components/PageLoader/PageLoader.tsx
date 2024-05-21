import { Box, CircularProgress } from '@mui/material';

export interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  return (
    <Box>
      {isLoading ? (
        <CircularProgress size={100} thickness={2} variant="indeterminate" />
      ) : (
        <></>
      )}
    </Box>
  );
};

export { PageLoader };
