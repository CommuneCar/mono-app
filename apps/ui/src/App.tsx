import { isMobile } from 'react-device-detect';

import './App.css';

import { Mobile } from './Pages/Mobile/Mobile';
import { Desktop } from './Pages/Desktop/Desktop';

function App() {
  return isMobile ? <Mobile /> : <Desktop />;
}

export default App;
