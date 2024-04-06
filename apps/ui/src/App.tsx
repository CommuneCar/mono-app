import './App.css';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import SideMenu from './SideMenu';
import RidesFeed from './RidesFeed';
import { useState } from 'react';

const rides = [
  {
    communityName: 'Travel friends Haifa - Tel Aviv',
    description: 'Zoe is leaving towards Tel Aviv in 50 Minutes. Join Zoe!',
  },
  {
    description:
      'Dar is leaving in 25 minutes to take some pictures of birds in the Golan Heights',
    communityName: 'Apple Friends - IL',
  },
  {
    communityName: 'Travel friends Haifa - Tel Aviv',
    description: 'Zoe is leaving towards Tel Aviv in 50 Minutes. Join Zoe!',
  },
  {
    description:
      'Dar is leaving in 25 minutes to take some pictures of birds in the Golan Heights',
    communityName: 'Apple Friends - IL',
  },
];

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
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
