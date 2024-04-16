import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/signup");
    } else {
      axios
        .get(`${import.meta.env.VITE_SERVER}/api/users/current-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data: { data: user } }) => {
          setUser({ ...user, accessToken: accessToken });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const logoutUser = () => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/api/users/logout`,
        {
          withCredientials: true,
        },
        {
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setUser("");
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-cover flex items-center justify-center">
      <button
        className="text-white bg-black py-2 px-4 rounded-full hover:bg-black/80 font-medium text-xl"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
