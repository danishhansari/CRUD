import { useState } from "react";

const InputBox = ({
  name,
  type,
  id,
  placeholder,
  icon,
  defaultValue,
  value,
  disable = false,
  className = "",
}) => {
  const [passwordVisiblity, setPasswordVisiblity] = useState(false);
  return (
    <>
      <div className="relative w-full mb-4">
        <input
          name={name}
          defaultValue={defaultValue}
          value={value}
          type={
            type === "password"
              ? passwordVisiblity
                ? "text"
                : "password"
              : type
          }
          className={`input-box ${className}`}
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
