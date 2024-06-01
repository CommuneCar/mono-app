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
        my: '1%',
        px: '1%',
      }}
    >
      <Typography
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem', px: '8px' }}
      >
        {title}
      </Typography>
      <Menu
        MenuButton={
          <Button sx={{ height: '100%' }} color="primary">
            <MenuIcon />
          </Button>
        }
      />
    </Box>
  );
};

export { PageHeader };
