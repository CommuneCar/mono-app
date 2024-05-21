import { Box, CircularProgress } from '@mui/material';

export interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Box minHeight={'30rem'}>
          <CircularProgress size={100} thickness={2} variant="indeterminate" />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export { PageLoader };
