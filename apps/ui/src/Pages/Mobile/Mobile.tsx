import React, { useState } from 'react';
import { Button, CssBaseline } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { MapPage } from './pages/Map';
import RidesFeed from './pages/RidesFeed';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/Signup/SignUp';
import { HomePage } from './pages/HomePage/HomePage';
import MapNavigationPage from './pages/MapNavigation';
import { Menu } from '../../Components/Menu/Menu';
import SearchBar from '../../Components/Map/SearchBar';
import CommunitiesFeed from '../../Components/Communities/CommunitiesFeed';

import {
  useGetAllRides,
  useGetAllCommunities,
} from '../../hooks/Communities/useGetAllCommunities';

const Mobile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const communities = useGetAllCommunities();
  const rides = useGetAllRides();

  return (
    <>
      <CssBaseline />
      <Router>
        <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        <Button onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </Button>

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rides" element={<RidesFeed rides={rides} />} />
          <Route
            path="/communities"
            element={<CommunitiesFeed communities={communities} />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/map/navigation" element={<MapNavigationPage />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </Router>
    </>
  );
};

export { Mobile };
