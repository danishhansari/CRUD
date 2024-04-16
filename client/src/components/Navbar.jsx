import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "../App";

const Navbar = () => {
  const {
    user,
    user: { accessToken },
  } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <nav className="px-[5vw] py-5 h-[80px] bg-white w-full gap-12 sticky border-b border-gray-200 flex items-center justify-between">
        <Link className="w-10" to="/">
          <img src={logo} className="w-full" alt="logo" />
        </Link>

        {accessToken ? (
          <div className="flex gap-4 items-center">
            <Link to='/change-password'>
              <button className="py-2 px-4 bg-black hover:bg-black/80 text-white rounded-full">
                Change password
              </button>
            </Link>
            <Link>
              <img className="w-10 rounded-full" src={user.avatar} alt="" />
            </Link>
            <Link></Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/signup">
              <button className="py-2 px-6 bg-black hover:bg-black/80 text-white rounded-full">
                Signup
              </button>
            </Link>
            <Link to="/signin" className="hidden md:block">
              <button className="py-2 px-6 bg-gray-100 text-black hover:bg-gray-200 transition-colors duration-75 rounded-full">
                Signin
              </button>
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
