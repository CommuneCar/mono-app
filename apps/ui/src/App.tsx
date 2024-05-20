import React from 'react';
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
import { MessagesFeed } from './Pages/Messages/MessagesFeed';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { CommunitiesFeed } from './Communities/CommunitiesFeed';
import { useGetAllCommunities } from './hooks/Communities/useGetAllCommunities';

const App: React.FC = () => {
  const { data: communities } = useGetAllCommunities();
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
                      path="/communities"
                      element={<CommunitiesFeed communities={communities} />}
                    />
                    <Route path="/home" element={<HomePage />} />
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
