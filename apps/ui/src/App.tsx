import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import SideMenu from './SideMenu';
import RidesFeed from './RidesFeed';
import CommunitiesFeed from './Communities';
import { useState } from 'react';
import tlv from './assets/tlv.png';
import apple from './assets/apple.png';
import camera from './assets/camera.png';

const options = [tlv, apple, camera];

const getRandomOption = () => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const currentDate = new Date();

const rides = [
  {
    driver: 'Zoe Shwartz',
    departureTime: new Date(currentDate.getTime() + 60 * 60000), // Adding 60 minutes to the current time
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocation: 'Rotchild street, Tel Aviv',
    png: getRandomOption(),
    destination: 'Pardesia',
  },
  {
    driver: 'Dar Nachmani',
    departureTime: new Date(currentDate.getTime() + 120 * 60000),
    communityName: 'Apple Friends - IL',
    png: getRandomOption(),
    startLocation: 'Efraim Katzir street, Hod Hasharon',
    destination: 'Modiin',
  },
  {
    driver: 'Avi Ron',
    departureTime: new Date(currentDate.getTime() + 50 * 60000),
    communityName: 'Travel friends Haifa - Tel Aviv',
    startLocation: 'Weizman street, Petah Tikva',
    destination: 'Holon',
    png: getRandomOption(),
  },
  {
    driver: 'Tal Kovler',
    departureTime: new Date(currentDate.getTime() + 25 * 60000),
    communityName: 'Apple Friends - IL',
    startLocation: 'Bla street, Haifa',
    destination: 'The Golan',
    png: getRandomOption(),
  },
];

const communities = [
  {
    name: 'Travel friends Haifa - Tel Aviv',
    description:
      'A Commute traveling each morning from Haifa to Tel Aviv and back each evening.',
    startLocation: 'Rotchild street, Tel Aviv',
    png: getRandomOption(),
  },
  {
    description:
      'The biggest israeli community of Apple fans traveling to new stores and events together.',
    name: 'Apple Friends - IL',
    startLocation: 'Rotchild street, Tel Aviv',
    png: getRandomOption(),
  },
  {
    name: 'Camera Buddies  - photo fun!',
    description: 'A group of hobby photographers traveling together',
    startLocation: 'Rotchild street, Tel Aviv',
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
