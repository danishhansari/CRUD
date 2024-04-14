import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { lookInSession } from "./common/session";
import Home from "./pages/Home";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null });
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
          <Routes>
            <Route path="/signup" element={<UserAuthPage type="sign-up" />} />
            <Route path="/signin" element={<UserAuthPage type="sign-in" />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
