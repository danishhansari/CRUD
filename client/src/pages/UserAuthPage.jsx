import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import axios from "axios";
import Cookies from "js-cookie";

const UserAuthPage = ({ type }) => {
  const navigate = useNavigate();
  const userAuthThroughtServer = (serverRoute, formData) => {
    let loadingToast = toast.loading(
      serverRoute === "signin" ? "logging" : "creating new user"
    );

    axios
      .post(`${import.meta.env.VITE_SERVER}/api/users/${serverRoute}`, formData)
      .then(({ data: { data } }) => {
        toast.dismiss(loadingToast);
        toast.success("authentication successful");
        console.log(data);
        Cookies.set("accessToken", data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loadingToast);
        const message = err.response.data.message;
        return toast.error(message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = type === "sign-in" ? "signin" : "signup";

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let form = new FormData(formElement);
    const formData = {};

    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);
    const { fullName, email, password, username } = formData;

    if (fullName && fullName.length < 3) {
      return toast.error("Name must be at least 3 letters long");
    }
    if (username && username.length < 3) {
      return toast.error("username must be at least 3 letters long");
    }
    if (type === "signup") {
      if (!email.length) {
        return toast.error("Email cannot be empty");
      }
      if (!emailRegex.test(email)) {
        return toast.error("Email is invalid");
      }
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 character password long with a numeric, 1 lowercase and 1 uppercase letter"
      );
    }
    userAuthThroughtServer(serverRoute, formData);
  };

  return (
    <>
      <AnimationWrapper keyValue={type}>
        <Toaster position="top-center" />
        <section className="h-cover flex items-center justify-center">
          <form id="formElement" className="w-[80%] max-w-[400px]">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-16">
              {type === "sign-in" ? "Welcome back" : "Join us today"}
            </h1>

            {type !== "sign-in" ? (
              <>
                <InputBox
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  id="fullname"
                  icon="fi fi-rr-user"
                />
                <InputBox
                  name="email"
                  type="email"
                  placeholder="Email"
                  id="email"
                  icon="fi-rr-envelope"
                />
              </>
            ) : (
              ""
            )}

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
              className="bg-black text-white py-3 px-6 inter hover:bg-black/80 transition-colors duration-100 font-medium rounded-full capitalize  block mx-auto"
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
