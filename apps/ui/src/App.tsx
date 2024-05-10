import { useState } from 'react';
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Menu as MenuIcon } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { MapPage } from './Pages/Map';
import RidesFeed from './Pages/RidesFeed';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/Signup/SignUp';
import { Menu } from './Components/Menu/Menu';
import SearchBar from './Components/Map/SearchBar';
import { HomePage } from './Pages/HomePage/HomePage';
import MapNavigationPage from './Pages/MapNavigation';
import CommunitiesFeed from './Communities/CommunitiesFeed';
import {
  useGetAllRides,
  useGetAllCommunities,
} from './hooks/Communities/useGetAllCommunities';
import { UserProvider } from './hooks/Users/useUser';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const communities = useGetAllCommunities();

  const rides = useGetAllRides();

  return (
    <>
      <UserProvider>
        <CssBaseline />
        <Router>
          <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

          <Button onClick={() => setIsMenuOpen(true)}>
            <MenuIcon />
          </Button>

          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/rides" element={<RidesFeed rides={rides} />} />
              <Route
                path="/communities"
                element={<CommunitiesFeed communities={communities} />}
              />
              <Route path="/home" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/map/navigation" element={<MapNavigationPage />} />
              <Route path="/search" element={<SearchBar />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
