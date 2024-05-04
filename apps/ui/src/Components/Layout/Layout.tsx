import { Badge, Box, Fab, IconButton } from '@mui/material';
import { Menu } from './Menu/Menu';
import { Menu as MenuIcon, Mail as MailIcon } from '@mui/icons-material';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 8,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '22%',
          zIndex: 1200,
        }}
      >
        <Fab color="primary" onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </Fab>
        <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <Fab color="primary">
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        </Fab>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>{children}</Box>
    </Box>
  );
};

export { Layout };
