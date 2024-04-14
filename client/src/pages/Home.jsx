import { useContext, useEffect } from "react";
import { lookInSession } from "../common/session";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";

const Home = () => {
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useContext(UserContext);
  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  });
  return !accessToken ? <Navigate to="signup" /> : <div>Home</div>;
};

export default Home;
