import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { Button, CssBaseline } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Session, createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { MapPage } from './Pages/Map';
import RidesFeed from './Pages/RidesFeed';
import { Menu } from './Components/Menu/Menu';
import SearchBar from './Components/Map/SearchBar';
import { HomePage } from './Pages/HomePage/HomePage';
import MapNavigationPage from './Pages/MapNavigation';
import CommunitiesFeed from './Communities/CommunitiesFeed';
import {
  useGetAllRides,
  useGetAllCommunities,
} from './hooks/Communities/useGetAllCommunities';

const supabase = createClient(
  'https://guzwjncnbuiiazedbuis.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1endqbmNuYnVpaWF6ZWRidWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMTkyNjgsImV4cCI6MjAyOTY5NTI2OH0.24aX1cMX4ilkkUoZs-GE-MxWCoqfaE6rmnwRpJMxs-g',
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const communities = useGetAllCommunities();

  const rides = useGetAllRides();

  return session ? (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      <CssBaseline />
      <Router>
        <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        <Button onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </Button>

        <Routes>
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
      </Router>
    </SessionContextProvider>
  ) : (
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  );
}

export default App;
