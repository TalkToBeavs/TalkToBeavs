import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/layout/ThemeToggle';

import SidebarWithHeader from '../components/layout/Skeleton';

import store from '../redux/store/store';

import FourOhFour from '../pages/error/FourOhFour';

import Home from '../pages/navigation/Home';
import Landing from '../pages/navigation/Landing';
import Lobby from '../pages/navigation/Lobby';
import Logout from '../pages/navigation/Logout';
import TextLobby from '../pages/navigation/TextLobby';
import VideoLobby from '../pages/navigation/VideoLobby';

import Feed from '../pages/feed/Feed';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

import { AnimatePresence } from 'framer-motion';
import TextChat from '../pages/chat/TextChat';
import VideoChat from '../pages/chat/VideoChat';
import Profile from '../pages/profile/Profile';

const App = () => {
  const location = useLocation();
  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
        <SidebarWithHeader>
          <ThemeToggle />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />

            <Route path='/home' element={<Home />} />

            <Route path='/profile/:onid' element={<Profile />} />

            <Route path='/feed' element={<Feed />} />
            <Route path='/lobby' element={<Lobby />} />

            <Route path='/video' element={<VideoLobby />} />
            <Route path='/video/:roomId' element={<VideoChat />} />

            <Route path='/text' element={<TextLobby />} />
            <Route path='/text/:roomId' element={<TextChat />} />

            <Route path='*' element={<FourOhFour />} />
          </Routes>
        </SidebarWithHeader>
      </AnimatePresence>
    </Provider>
  );
};

export default App;
