import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/signup");
    }
  }, []);

  const logoutUser = () => {
    console.log(`${import.meta.env.VITE_SERVER}/api/users/logout`);
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
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
