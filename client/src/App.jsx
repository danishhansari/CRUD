import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ChangePassword from "./pages/ChangePassword";

export const UserContext = createContext({});
function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/signup" element={<UserAuthPage type="sign-up" />} />
              <Route path="/signin" element={<UserAuthPage type="sign-in" />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
