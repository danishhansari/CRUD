import { useState } from "react";

const InputBox = ({
  name,
  type,
  id,
  placeholder,
  icon,
  value,
  disable = false,
}) => {
  const [passwordVisiblity, setPasswordVisiblity] = useState(false);
  return (
    <>
      <div className="relative w-full mb-4">
        <input
          name={name}
          defaultValue={value}
          value={value}
          type={
            type === "password"
              ? passwordVisiblity
                ? "text"
                : "password"
              : type
          }
          className="input-box"
          disabled={disable}
          placeholder={placeholder}
          id={id}
        />
        <i className={`fi ${icon} input-icon left-3`}></i>
        {type === "password" ? (
          <i
            className={`fi input-icon right-4 cursor-pointer 
             ${!passwordVisiblity ? "fi-rr-eye-crossed" : "fi-rr-eye"}`}
            onClick={() => setPasswordVisiblity((currVal) => !currVal)}
          ></i>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default InputBox;
