import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login";
import Chat from "./pages/Chat/chat";
import Profile from "./pages/Profile/Profile";
import Logout from "./pages/Logout/Logout";
import Error from "./pages/Error/Error";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
    <AuthProvider>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
      
    </>
  );
};

export default App;
