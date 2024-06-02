import { isMobile } from 'react-device-detect';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { Menu } from '../Menu/Menu';

export interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        my: '20px',
        px: '20px',
      }}
    >
      <Typography textTransform="uppercase" sx={{ letterSpacing: '0.15rem' }}>
        {title}
      </Typography>
      {isMobile && (
        <Menu
          MenuButton={
            <Button sx={{ height: '100%' }} color="primary">
              <MenuIcon />
            </Button>
          }
        />
      )}
    </Box>
  );
};

export { PageHeader };
