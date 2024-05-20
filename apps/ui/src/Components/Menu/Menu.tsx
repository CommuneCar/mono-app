import {
  Box,
  List,
  Avatar,
  Divider,
  ListItem,
  IconButton,
  Typography,
  ToggleButton,
  ListItemText,
  ListItemButton,
  SwipeableDrawer,
  ToggleButtonGroup,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import defaultTheme from '../../themes/default';
import { Role, useRole } from '../../contexts/role';
import { useUser } from '../../hooks/Users/useUser';

interface MenuProps {
  MenuButton?: React.ReactElement;
}

const Menu: React.FC<MenuProps> = ({ MenuButton }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const { user, signOut } = useUser();
  const { role, setRole } = useRole();

  const handleChangeRole = (
    event: React.MouseEvent<HTMLElement>,
    newRole: Role,
  ) => {
    event.stopPropagation();
    event.stopPropagation();
    setRole(newRole);
  };

  const menuOptions: Record<string, string> = useMemo(
    () => ({
      Home: '/home',
      Messages: '/messages',
      Communities: '/communities',
    }),
    [],
  );

  return (
    <>
      {MenuButton && <Box onClick={() => setIsOpen(true)}>{MenuButton}</Box>}
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
          <IconButton
            sx={{
              marginTop: '5%',
              marginLeft: '5%',
              borderRadius: '8px',
              border: `solid ${defaultTheme.palette.info.dark} 1px`,
            }}
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Box
            sx={{
              width: '100%',
              height: '40%',
              display: 'flex',
              marginTop: '5%',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ height: '100px', width: '100px' }} />
            <Typography sx={{ marginTop: '5%' }}>
              Hi {user?.firstName} {user?.lastName[0]}. 👋
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <ToggleButtonGroup
              exclusive
              value={role}
              size={'small'}
              color={'primary'}
              onChange={handleChangeRole}
            >
              <ToggleButton value={'driver'}>Driver</ToggleButton>
              <ToggleButton value={'rider'}>rider</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <List>
            {Object.keys(menuOptions).map((text) => (
              <Box key={text}>
                <ListItem
                  sx={{
                    paddingRight: '0',
                    color: defaultTheme.palette.info.dark,
                    '&:hover': {
                      backgroundColor: defaultTheme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemButton
                    onClick={() => navigate(menuOptions[text] as string)}
                  >
                    <ListItemText primary={text} />
                    <ChevronRightIcon color={'action'} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
          <Box sx={{ marginTop: '80px' }}>
            <Divider />
            <ListItem
              sx={{
                paddingRight: '0',
                color: defaultTheme.palette.info.dark,
                '&:hover': {
                  backgroundColor: defaultTheme.palette.action.hover,
                },
              }}
            >
              <ListItemButton onClick={() => signOut()}>
                <ListItemText primary={'Log out'} />
                <ChevronRightIcon color={'action'} />
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export { Menu };
