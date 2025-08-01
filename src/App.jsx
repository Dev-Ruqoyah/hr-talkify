import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login";
import Chat from "./pages/Chats/ChatPage";
import { AuthProvider } from "./context/AuthContext";
import MealDetails from "./pages/Meal/DisplayMeal";
import NotFoundPage from "./pages/Error/Error";
import { ChatProvider } from "./context/ChatContext";

const App = () => {
  return (
    <>
    <AuthProvider>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatProvider>
          <Chat />
        </ChatProvider>} />
        <Route path="/meal-detail/:name/:id" element={<MealDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
      
    </>
  );
};

export default App;
