import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { MapPage } from './Pages/Map';
import RidesFeed from './Pages/RidesFeed';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/Signup/SignUp';
import SearchBar from './Components/Map/SearchBar';
import { HomePage } from './Pages/HomePage/HomePage';
import MapNavigationPage from './Pages/MapNavigation';
import CommunitiesFeed from './Communities/CommunitiesFeed';
import {
  useGetAllRides,
  useGetAllCommunities,
} from './hooks/Communities/useGetAllCommunities';
import { Layout } from './Components/Layout/Layout';

function App() {
  const communities = useGetAllCommunities();

  const rides = useGetAllRides();

  return (
    <>
      <CssBaseline />
      <Router>
        <Layout>
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
        </Layout>
      </Router>
    </>
  );
}

export default App;
