import { useContext, useEffect } from "react";
import { lookInSession } from "../common/session";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";

const Home = () => {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);
  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  });
  return !access_token ? <Navigate to="signup" /> : <div>Home</div>;
};

export default Home;
