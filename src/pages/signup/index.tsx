/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import RegisterForm from "../../components/Register";
import { initializeAdmin } from "../../utils";

export const registerFields = [
  {
    id: "email",
    type: "text",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    id: "username",
    type: "text",
    label: "Username",
    placeholder: "Choose a preferred username",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Choose a strong password",
  },
];

const SignUp: React.FC = () => {
  useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-col h-full">
        <img src="/Logo.svg" alt="" />
        <RegisterForm isModal={false} fields={registerFields} />
      </div>
    </>
  );
};

export default SignUp;
