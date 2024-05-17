import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { MapPage } from './Pages/Map';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/Signup/SignUp';
import { RidesFeed } from './Pages/RidesFeed';
import { RoleProvider } from './contexts/role';
import { ProtectedRoute } from './ProtectedRoute';
import SearchBar from './Components/Map/SearchBar';
import { HomePage } from './Pages/HomePage/HomePage';
import { UserProvider } from './hooks/Users/useUser';
import MapNavigationPage from './Pages/MapNavigation';
import { MessagesFeed } from './Pages/Messages/MessagesFeed';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { CommunitiesFeed } from './Communities/CommunitiesFeed';

const App: React.FC = () => {
  return (
    <>
      <SnackbarProvider>
        <UserProvider>
          <RoleProvider>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/messages" element={<MessagesFeed />} />
                  <Route path="/rides" element={<RidesFeed />} />
                  <Route path="/communities" element={<CommunitiesFeed />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route
                    path="/map/navigation"
                    element={<MapNavigationPage />}
                  />
                  <Route path="/search" element={<SearchBar />} />
                </Route>
              </Routes>
            </Router>
          </RoleProvider>
        </UserProvider>
      </SnackbarProvider>
    </>
  );
};

export { App };
