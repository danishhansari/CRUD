import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster, toast } from "react-hot-toast";
import InputBox from "../components/InputBox";
import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";

const ChangePassword = () => {
  const {
    user,
    user: { accessToken },
  } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(formElement);
    const formData = {};
    for (let [key, value] of data.entries()) {
      formData[key] = value;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const { newPassword } = formData;

    if (!passwordRegex.test(newPassword)) {
      return toast.error(
        "Password should be 6 to 20 character password long with a numeric, 1 lowercase and 1 uppercase letter"
      );
    }
    let loadingToast = toast.loading("Changing");
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/api/users/change-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        toast.dismiss(loadingToast);
        return toast.success("Password change");
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
        return toast.error(err.message);
      });
  };

  return (
    <>
      <AnimationWrapper>
        <Toaster position="top-center" />
        <section className="h-cover flex items-center justify-center">
          <form id="formElement" className="w-[80%] max-w-[400px]">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-8 md:mb-16">
              Change Password
            </h1>

            <InputBox
              type="text"
              defaultValue={user.username}
              id="username"
              disabled={true}
              icon="fi fi-rr-at"
              className="bg-black"
            />
            <InputBox
              name="oldPassword"
              type="password"
              placeholder="Current Password"
              id="password"
              icon="fi-rr-key"
            />
            <InputBox
              name="newPassword"
              type="password"
              placeholder="New Password"
              id="password"
              icon="fi-rr-key"
            />

            <button
              onClick={handleSubmit}
              className="bg-black text-white py-3 px-6 inter hover:bg-black/80 transition-colors duration-100 font-medium rounded-full capitalize  block mx-auto"
              type="submit"
            >
              Change Password
            </button>
          </form>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default ChangePassword;
