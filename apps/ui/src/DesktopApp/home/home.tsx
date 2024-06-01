import {
  Box,
  Card,
  List,
  Avatar,
  Divider,
  ListItem,
  Typography,
  CardContent,
  ToggleButton,
  ListItemText,
  ListItemButton,
  ToggleButtonGroup,
} from '@mui/material';
import { flatten, groupBy } from 'lodash';
import React, { useMemo, useState } from 'react';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

import logo from '../../assets/logo-with-title.png';
import { Community, Ride } from '@communecar/types';

import defaultTheme from '../../themes/default';
import { Page } from '../../Pages/HomePage/styles';
import { useUser } from '../../hooks/Users/useUser';
import { Role, useRole } from '../../contexts/role';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { useGetAllRides } from '../../hooks/Rides/useGetAllRides';
import { useGetAllCommunities } from '../../hooks/Communities/useGetAllCommunities';
import { MessagesFeed } from '../../Pages/Messages/MessagesFeed';
import { CommunitiesFeed } from '../../Communities/CommunitiesFeed';

const Home: React.FC = () => {
  const { signOut, user } = useUser();
  const [selectedRide, setSecletedRide] = useState<Ride>();
  const [openedPage, setOpenedPage] =
    useState<keyof typeof menuOptions>('Home');
  const { role, setRole } = useRole();

  const { data: communitiesData, isLoading: isCommunitiesLoading } =
    useGetAllCommunities();
  const { data: ridesData, isLoading: isRidesLoading } = useGetAllRides();

  const menuOptions = useMemo(
    () => ({
      Home: <></>,
      Messages: (
        <Card
          sx={{
            top: 100,
            left: 280,
            zIndex: 20,
            height: '85%',
            width: '25%',
            borderRadius: '8px',
            position: 'absolute',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              <MessagesFeed />
            </Typography>
          </CardContent>
        </Card>
      ),
      Communities: (
        <Card
          sx={{
            top: 100,
            left: 280,
            zIndex: 20,
            width: '25%',
            height: '85%',
            borderRadius: '8px',
            position: 'absolute',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              <CommunitiesFeed />
            </Typography>
          </CardContent>
        </Card>
      ),
    }),
    [],
  );

  const communities = useMemo(() => {
    if (isCommunitiesLoading || isRidesLoading) {
      return [];
    }

    const groupedRides = groupBy(ridesData ?? [], 'communityName');
    return communitiesData
      ? communitiesData.map((community: Community) => ({
          ...community,
          rides: groupedRides[community.title] ?? [],
        }))
      : [];
  }, []);

  const handleChangeRole = (
    event: React.MouseEvent<HTMLElement>,
    newRole: Role,
  ) => {
    event.stopPropagation();
    event.stopPropagation();
    setRole(newRole);
  };

  return (
    <Page sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '20vw',
          backgroundColor: 'white',
          borderTopRightRadius: '18px',
          borderBottomRightRadius: '18px',
        }}
      >
        <img src={logo} style={{ height: '30%' }} />
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
        <Box
          sx={{
            height: '64%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <List sx={{ mt: '10%' }}>
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
                    onClick={() =>
                      setOpenedPage(text as keyof typeof menuOptions)
                    }
                  >
                    <ListItemText primary={text} />
                    <ChevronRightIcon color={'action'} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
          <Box>
            <Box sx={{ display: 'flex', margin: '4%', alignItems: 'center' }}>
              <Avatar
                src={user?.avatarUrl}
                sx={{ height: '35px', width: '35px' }}
              />
              <Typography sx={{ marginLeft: '5%', marginTop: '2%' }}>
                Hi {user?.firstName} {user?.lastName[0]}. 👋
              </Typography>
            </Box>

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
      </Box>
      {menuOptions[openedPage]}
      <Map
        shouldShowSearch={false}
        focusLocation={selectedRide?.startLocation}
        markers={
          flatten(
            communities.map((community) =>
              community.rides.map((ride: Ride) => ({
                geocode: ride.startLocation,
                popUp: `${ride.driver.firstName} ${ride.driver.lastName} going to ${ride.destinationName}`,
              })),
            ),
          ) as MarkerInfo[]
        }
      />
    </Page>
  );
};

export { Home };
