import React, { useState, useCallback, lazy } from "react";

const Form = lazy(() => import("../../components/Form"));

const fields = [
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

  const handleSignup = useCallback(
    (e: { preventDefault: () => void; }) => {
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
        <div className="mt-10 login-form sm:w-full lg:w-4/12 bg-[#26292D] border-2 border-[#35373B] rounded-lg sm:px-3 sm:py-5 lg:px-6 lg:py-10">
          <div className="text-center mb-10">
            <p className="text-sm">SIGN UP</p>
            <p className="text-lg text-white font-medium">
              Create an account to continue
            </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </div>
          <Form
            fields={fields}
            type="signup"
            btnText="Continue"
            setFormValues={setFormValues}
            handleSubmit={handleSignup}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
