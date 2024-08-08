/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useCallback } from "react";
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

interface User {
  username: string;
  email: string;
  password: string;
}
interface FormValues {
  [key: string]: string;
}

const SignUp: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { username, email, password } = formValues || {};

  useEffect(() => {
    initializeAdmin();
  }, []);

  const handleSignup = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!username || !email || !password) {
        setError("All fields are required");
        return;
      }

      const newUser: User = { username, email, password };

      const existingUsers = localStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const isEmailTaken = users.some((user: User) => user.email === email);
      if (isEmailTaken) {
        setError("Email is already taken");
        return;
      }

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      setFormValues({});
      setSuccess("Signup successful! You can now log in.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    },
    [username, email, password]
  );

  return (
    <>
      <div className="flex items-center justify-center flex-col h-full">
        <img src="/Logo.svg" alt="" />
        <RegisterForm
          fields={registerFields}
          setFormValues={setFormValues}
          error={error}
          success={success}
          handleSignup={handleSignup}
        />
      </div>
    </>
  );
};

export default SignUp;
