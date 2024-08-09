import React from "react";
import { Link } from "react-router-dom";

export interface Field {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

export interface FormProps {
  type: string;
  isModal: boolean;
  fields: Field[];
  btnText: string;
  setFormValues: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  handleSubmit: (event: React.FormEvent) => void;
  setPopupChild: (type: "login" | "signup") => void;
}

const Form: React.FC<FormProps> = ({
  isModal,
  fields = [],
  type,
  btnText,
  setFormValues,
  setPopupChild,
  handleSubmit,
}) => {
  const handleChange = (name: string, value: string) => {
    setFormValues((prevState) => {
      if (prevState[name] === value) {
        return prevState;
      }
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        {fields.map(({ label, placeholder, type, id }) => (
          <div key={id} className="form-group">
            <label htmlFor="email">{label}</label>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              onChange={(e) => handleChange(id, e.target.value)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-[#4A96FF] w-full text-base px-10 py-2 rounded-md"
        >
          {btnText}
        </button>
      </form>
      {type == "login" ? (
        <p className="text-sm mt-3">
          Not registered yet?
          {isModal ? (
            <button
              className="ml-1 text-white"
              onClick={() => setPopupChild("signup")}
            >
              Login →
            </button>
          ) : (
            <Link to="/sign-up" className="ml-1 text-white">
              Register →
            </Link>
          )}
        </p>
      ) : (
        <>
          <p className="text-sm mt-3">
            Already have an account?
            {isModal ? (
              <button
                className="ml-1 text-white"
                onClick={() => setPopupChild("login")}
              >
                Login →
              </button>
            ) : (
              <Link to="/login" className="ml-1 text-white">
                Login →
              </Link>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
