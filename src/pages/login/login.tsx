import React, { lazy } from "react";

const Form = lazy(() => import("../../components/Form"));

const Login: React.FC = () => {
  const fields = [
    {
      id: "email",
      type: "text",
      label: "Email or Username",
      placeholder: "Enter your email or username",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
    },
  ];

  const handleClick = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col h-full">
        <img src="/Logo.svg" alt="" />
        <div className="mt-10 login-form sm:w-full lg:w-4/12 bg-[#26292D] border-2 border-[#35373B] rounded-lg sm:px-3 sm:py-5 lg:px-6 lg:py-10">
          <div className="text-center mb-10">
            <p className="text-sm">WELCOME BACK</p>
            <p className="text-lg text-white font-medium">
              Log into your account
            </p>
          </div>
          <Form
            fields={fields}
            type="login"
            btnText="Login now"
            handleSubmit={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
