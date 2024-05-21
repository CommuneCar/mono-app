import { Box, CircularProgress } from '@mui/material';

export interface PageLoaderProps {
  isLoading: boolean;
  minHeight?: number;
  paddingTop?: number;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  minHeight = 30,
  paddingTop = 0,
}) => {
  return (
    <>
      {isLoading && (
        <Box minHeight={`${minHeight}rem`} paddingTop={`${paddingTop}rem`}>
          <CircularProgress size={100} thickness={2} variant="indeterminate" />
        </Box>
      )}
    </>
  );
};

export { PageLoader };
