import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import SignIn from './Pages/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/Signup';
import SideMenu from './Components/Menu';
import RidesFeed from './Pages/RidesFeed';
import MapPage from './Pages/Map';
import CommunitiesFeed from './Communities';
import { useState } from 'react';
import tlv from './assets/tlv.png';
import apple from './assets/apple.png';
import camera from './assets/camera.png';
import SearchBar from './Components/Map/SearchBar';

const options = [tlv, apple, camera];

const getRandomOption = () => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const rides = [
  {
    communityName: 'Travel friends Haifa - Tel Aviv',
    description: 'Zoe is leaving towards Tel Aviv in 50 Minutes. Join Zoe!',
    png: getRandomOption(),
  },
  {
    description:
      'Dar is leaving in 25 minutes to take some pictures of birds in the Golan Heights',
    communityName: 'Apple Friends - IL',
    png: getRandomOption(),
  },
  {
    communityName: 'Travel friends Haifa - Tel Aviv',
    description: 'Zoe is leaving towards Tel Aviv in 50 Minutes. Join Zoe!',
    png: getRandomOption(),
  },
  {
    description:
      'Dar is leaving in 25 minutes to take some pictures of birds in the Golan Heights',
    communityName: 'Apple Friends - IL',
    png: getRandomOption(),
  },
];

const communities = [
  {
    name: 'Travel friends Haifa - Tel Aviv',
    description:
      'A Commute traveling each morning from Haifa to Tel Aviv and back each evening.',
    png: getRandomOption(),
  },
  {
    description:
      'The biggest israeli community of Apple fans traveling to new stores and events together.',
    name: 'Apple Friends - IL',
    png: getRandomOption(),
  },
  {
    name: 'Camera Buddies  - photo fun!',
    description: 'A group of hobby photographers traveling together',
    png: getRandomOption(),
  },
];

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
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
          <Route path="/map" element={<MapPage />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
