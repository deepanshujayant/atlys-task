import React, { useState, lazy } from "react";
import { useAuth } from "../../Auth";
import { Navigate } from "react-router-dom";

interface FormValues {
  [key: string]: string;
}

const Form = lazy(() => import("../../components/Form"));

const fields = [
  {
    id: "user",
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

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [error, setError] = useState<string>("");
  const { user, login } = useAuth();
  const handleClick = (e: React.FormEvent): void => {
    e.preventDefault();
    const { user, password } = formValues;
    if (!login(user, password)) {
      setError("Invalid credentials");
    }
  };

  // Redirecting if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <Form
            fields={fields}
            type="login"
            btnText="Login now"
            setFormValues={setFormValues}
            handleSubmit={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
