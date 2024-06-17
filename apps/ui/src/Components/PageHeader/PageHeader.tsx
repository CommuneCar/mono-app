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
        alignItems: 'center',
        my: isMobile ? '1%' : '4%',
        px: isMobile ? '1%' : '4%',
        justifyContent: 'space-between',
        pt: '0.5rem',
      }}
    >
      <Typography
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem', px: '8px' }}
      >
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
