import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import RsvpIcon from '@mui/icons-material/Rsvp';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultTheme from './themes/default';

const SideMenu = () => {
  const [drawer, setDrawer] = React.useState(false);
  const navigate = useNavigate();

  const menuOptions: Record<string, [ReactNode, string]> = {
    Rides: [
      <DirectionsCarIcon sx={{ color: defaultTheme.palette.common.white }} />,
      '/rides',
    ],
    Communities: [
      <PeopleIcon sx={{ color: defaultTheme.palette.common.white }} />,
      '/communities',
    ],
    Invitations: [
      <RsvpIcon sx={{ color: defaultTheme.palette.common.white }} />,
      '',
    ],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button onClick={() => setDrawer(true)}>
        <MenuIcon color="action" />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
        PaperProps={{
          sx: {
            backgroundColor: defaultTheme.palette.primary.light,
          },
        }}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={() => setDrawer(false)}
          onKeyDown={() => setDrawer(false)}
        >
          <List>
            {Object.keys(menuOptions).map((text) => (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  color: defaultTheme.palette.common.white,
                  '&:hover': {
                    backgroundColor: defaultTheme.palette.action.hover,
                  },
                }}
              >
                <ListItemButton onClick={() => navigate(menuOptions[text][1])}>
                  <ListItemIcon>{menuOptions[text][0]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default SideMenu;