import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { MapPage } from './Pages/Map';
import SignIn from './Pages/SignIn/SignIn';
import { RidesFeed } from './Pages/RidesFeed';
import { SignUp } from './Pages/Signup/SignUp';
import { RoleProvider } from './contexts/role';
import { ProtectedRoute } from './ProtectedRoute';
import SearchBar from './Components/Map/SearchBar';
import { HomePage } from './Pages/HomePage/HomePage';
import { UserProvider } from './hooks/Users/useUser';
import MapNavigationPage from './Pages/MapNavigation';
import { MessagesFeed } from './Pages/Messages/MessagesFeed';
import { useGetAllRides } from './hooks/Rides/useGetAllRides';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { CommunitiesFeed } from './Communities/CommunitiesFeed';
import { useGetAllCommunities } from './hooks/Communities/useGetAllCommunities';

const App: React.FC = () => {
  const { data: communities } = useGetAllCommunities();

  const { data: rides } = useGetAllRides();

  return (
    <>
      <SnackbarProvider>
        <UserProvider>
          <RoleProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={'en-gb'}
            >
              <CssBaseline />
              <Router>
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/messages" element={<MessagesFeed />} />
                    <Route
                      path="/rides"
                      element={
                        <RidesFeed
                          rides={rides ?? []}
                          communities={communities ?? []}
                        />
                      }
                    />
                    <Route
                      path="/communities"
                      element={<CommunitiesFeed communities={communities} />}
                    />
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
            </LocalizationProvider>
          </RoleProvider>
        </UserProvider>
      </SnackbarProvider>
    </>
  );
};

export { App };
