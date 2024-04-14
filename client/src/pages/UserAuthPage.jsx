import { useContext } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { UserContext } from "../App";
import { Toaster } from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import InputBox from "../components/InputBox";

const UserAuthPage = ({ type }) => {
  const handleSubmit = () => {};
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  return access_token ? (
    <Navigate to={"/"} />
  ) : (
    <>
      <AnimationWrapper keyValue={type}>
        <Toaster position="top-center" />
        <section className="h-cover flex items-center justify-center">
          <form id="formElement" className="w-[80%] max-w-[400px]">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-16">
              {type === "sign-in" ? "Welcome back" : "Join us today"}
            </h1>

            {type !== "sign-in" ? (
              <InputBox
                type="text"
                name="fullname"
                placeholder="Full Name"
                id="fullname"
                icon="fi fi-rr-user"
              />
            ) : (
              ""
            )}

            <InputBox
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              icon="fi-rr-envelope"
            />
            <InputBox
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              icon="fi fi-rr-at"
            />
            <InputBox
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              icon="fi-rr-key"
            />

            <button
              onClick={handleSubmit}
              className="bg-black text-white py-2 px-4 rounded-full capitalize  block mx-auto"
              type="submit"
            >
              {type.replace("-", " ")}
            </button>

            {type === "sign-in" ? (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Don't have an account?
                <Link
                  to="/signup"
                  className="underline text-black text-xl ml-1"
                >
                  Join us today.
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Already a member ?
                <Link
                  to="/signin"
                  className="underline text-black text-xl ml-1"
                >
                  Sign in here.
                </Link>
              </p>
            )}
          </form>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default UserAuthPage;
