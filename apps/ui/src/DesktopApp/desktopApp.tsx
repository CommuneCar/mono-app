import { CssBaseline } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home } from './home/home';
import SignIn from '../Pages/SignIn/SignIn';
import { SignUp } from '../Pages/Signup/SignUp';
import { ProtectedRoute } from '../ProtectedRoute';

const DesktopApp: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export { DesktopApp };
