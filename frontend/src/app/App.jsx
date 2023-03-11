import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
import io from "socket.io-client";
import { Provider } from "react-redux";

import SidebarWithHeader from "../components/layout/Skeleton";
import { AuthContext } from "../components/AuthProvider";
import ProtectedRoute from "../components/ProtectedRoute";

import store from "../redux/store/store";

import FourOhFour from "../pages/error/FourOhFour";

import VideoLobby from "../pages/navigation/VideoLobby";
import TextLobby from "../pages/navigation/TextLobby";
import Home from "../pages/navigation/Home";
import Landing from "../pages/navigation/Landing";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

import VideoChat from "../pages/chat/VideoChat";
import TextChat from "../pages/chat/TextChat";

const App = () => {
  // useEffect(() => {
  //   getUser(email);
  // }, []);

  return (
    <Provider store={store}>
      {/* <SidebarWithHeader> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/video" element={<VideoLobby />} />
          <Route path="/video/:roomId" element={<VideoChat />} />

          <Route path="/text" element={<TextLobby />} />
          <Route path="/text/:roomId" element={<TextChat />} />

          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </BrowserRouter>
      {/* </SidebarWithHeader> */}
    </Provider>
  );
};

export default App;
