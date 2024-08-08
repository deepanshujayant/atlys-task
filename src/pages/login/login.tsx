/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useAuth } from "../../Auth";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/Login";

export const loginFields = [
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
  const { user } = useAuth();

  // Redirecting if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="flex items-center justify-center flex-col h-full">
        <img src="/Logo.svg" alt="" />
        <LoginForm isModal={false} fields={loginFields} />
      </div>
    </>
  );
};

export default Login;
