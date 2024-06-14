import React from 'react';
import { isMobile } from 'react-device-detect';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import SignIn from './Pages/SignIn/SignIn';
import { SignUp } from './Pages/Signup/SignUp';
import { RoleProvider } from './contexts/role';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from './Pages/HomePage/HomePage';
import { UserProvider } from './hooks/Users/useUser';
import { DesktopApp } from './DesktopApp/desktopApp';
import { MessagesFeed } from './Pages/Messages/MessagesFeed';
import { CommunitiesFeed } from './Communities/CommunitiesFeed';
import { MapRouting } from './Pages/MapRouting/MapRoutingMachine';
import globalStyles from './globalStyles';

const App: React.FC = () => {
  return (
    <>
      <UserProvider>
        {globalStyles}
        <RoleProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={'en-gb'}
          >
            {isMobile ? (
              <>
                <CssBaseline />
                <Router>
                  <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/messages" element={<MessagesFeed />} />
                      <Route
                        path="/communities"
                        element={<CommunitiesFeed />}
                      />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/rides/:rideId" element={<MapRouting />} />
                    </Route>
                  </Routes>
                </Router>
              </>
            ) : (
              <DesktopApp />
            )}
          </LocalizationProvider>
        </RoleProvider>
      </UserProvider>
    </>
  );
};

export { App };
