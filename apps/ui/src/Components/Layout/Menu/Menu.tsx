import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  SwipeableDrawer,
  ListItemIcon,
} from '@mui/material';
import {
  Map as MapIcon,
  Rsvp as RsvpIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  Navigation as NavigationIcon,
  DirectionsCar as DirectionsCarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { Dispatch, ReactNode, SetStateAction, useMemo } from 'react';

import defaultTheme from '../../../themes/default';

interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const menuOptions: Record<string, [ReactNode, string]> = useMemo(
    () => ({
      Home: [
        <HomeIcon sx={{ color: defaultTheme.palette.info.dark }} />,
        '/home',
      ],

      Rides: [
        <DirectionsCarIcon sx={{ color: defaultTheme.palette.info.dark }} />,
        '/rides',
      ],
      Communities: [
        <PeopleIcon sx={{ color: defaultTheme.palette.info.dark }} />,
        '/communities',
      ],
      Invitations: [
        <RsvpIcon sx={{ color: defaultTheme.palette.info.dark }} />,
        '',
      ],
      SearchBar: [
        <SearchIcon sx={{ color: defaultTheme.palette.info.dark }} />,
        '/search',
      ],
      Map: [<MapIcon sx={{ color: defaultTheme.palette.info.dark }} />, '/map'],
      MapNavigation: [
        <NavigationIcon sx={{ color: defaultTheme.palette.info.dark }} />,
        '/map/navigation',
      ],
    }),
    [],
  );

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        PaperProps={{
          sx: {
            backgroundColor: defaultTheme.palette.common.white,
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role={'presentation'}
          onClick={() => setIsOpen(false)}
          onKeyDown={() => setIsOpen(false)}
        >
          <List>
            {Object.keys(menuOptions).map((text) => (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  color: defaultTheme.palette.info.dark,
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

export { Menu };
