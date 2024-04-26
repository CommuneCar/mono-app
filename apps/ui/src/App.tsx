import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import MapPage from './Pages/Map';
import SideMenu from './Components/Menu';
import RidesFeed from './Pages/RidesFeed';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/Signup/SignUp';
import SearchBar from './Components/Map/SearchBar';
import MapNavigationPage from './Pages/MapNavigation';
import { HomePage } from './Pages/home-page/home-page';
import CommunitiesFeed from './Communities/CommunitiesFeed';
import {
  useGetAllRides,
  useGetAllCommunities,
} from './hooks/Communities/useGetAllCommunities';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const communities = useGetAllCommunities();

  const rides = useGetAllRides();

  return (
    <>
      <CssBaseline />
      <Router>
        {menuVisible && <SideMenu />}
        <Routes>
          <Route
            path="/"
            element={<SignIn setMenuVisible={setMenuVisible} />}
          />
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
}

export default App;
