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

const menuOptions: Record<string, ReactNode> = {
  Rides: <DirectionsCarIcon />,
  Communities: <PeopleIcon />,
  Invitations: <RsvpIcon />,
};

const SideMenu = () => {
  const [drawer, setDrawer] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Button onClick={() => setDrawer(true)}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawer(false)}
          onKeyDown={() => setDrawer(false)}
        >
          <List>
            {Object.keys(menuOptions).map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{menuOptions[text]}</ListItemIcon>
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
