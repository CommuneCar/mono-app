import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import SideMenu from './SideMenu';
import RidesFeed from './RidesFeed';
import { useState } from 'react';
import tlv from './assets/tlv.png';
import apple from './assets/apple.png';
import camera from './assets/camera.png';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
