import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage";
import { useState, useEffect } from "react";
import Home from "./pages/Home";

import Cookies from "js-cookie";

function App() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const getAccessTokenFromCookie = () => {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name.trim() === "accessToken") {
          return decodeURIComponent(value);
        }
      }
      return null;
    };

    // Retrieve access token when component mounts
    const token = getAccessTokenFromCookie();
    if (token) {
      setAccessToken(token);
    }
  }, []);
  console.log(accessToken);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<UserAuthPage type="sign-up" />} />
          <Route path="/signin" element={<UserAuthPage type="sign-in" />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
