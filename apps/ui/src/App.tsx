import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import tlv from './assets/tlv.png';
import apple from './assets/apple.png';
import camera from './assets/camera.png';

import MapPage from './Pages/Map';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/Signup/SignUp';
import SideMenu from './Components/Menu';
import RidesFeed from './Pages/RidesFeed';
import { getRandomOption } from './utils';
import SearchBar from './Components/Map/SearchBar';
import MapNavigationPage from './Pages/MapNavigation';
import { HomePage } from './Pages/home-page/home-page';
import CommunitiesFeed from './Communities/CommunitiesFeed';
import { useGetAllCommunities } from './hooks/Communities/useGetAllCommunities';

const options = [tlv, apple, camera];

const currentDate = new Date();

const rides = [
  {
    driver: 'Zoe Shwartz',
    departureTime: new Date(currentDate.getTime() + 60 * 60000), // Adding 60 minutes to the current time
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocation: 'Rotchild street, Tel Aviv',
    png: getRandomOption(options),
    destination: 'Pardesia',
  },
  {
    driver: 'Dar Nachmani',
    departureTime: new Date(currentDate.getTime() + 120 * 60000),
    communityName: 'Apple Friends - IL',
    png: getRandomOption(options),
    startLocation: 'Efraim Katzir street, Hod Hasharon',
    destination: 'Modiin',
  },
  {
    driver: 'Avi Ron',
    departureTime: new Date(currentDate.getTime() + 50 * 60000),
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocation: 'Weizman street, Petah Tikva',
    destination: 'Holon',
    png: getRandomOption(options),
  },
  {
    driver: 'Tal Kovler',
    departureTime: new Date(currentDate.getTime() + 25 * 60000),
    communityName: 'Apple Friends - IL',
    startLocation: 'Bla street, Haifa',
    destination: 'The Golan',
    png: getRandomOption(options),
  },
];

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const communities = useGetAllCommunities();

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
