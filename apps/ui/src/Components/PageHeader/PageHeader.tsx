import { Box, Button, Typography } from '@mui/material';
import { Menu } from '../Menu/Menu';
import { Menu as MenuIcon } from '@mui/icons-material';

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
        alignItems: 'flex-end',
        mb: '1rem',
      }}
    >
      <Typography textTransform="uppercase" sx={{ letterSpacing: '0.15rem' }}>
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
