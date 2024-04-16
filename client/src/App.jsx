import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage";
import { useState, createContext } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

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
            </Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
