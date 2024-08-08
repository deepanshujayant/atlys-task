import React, { useState, useCallback, lazy, Suspense } from "react";
import { Field } from "./Form";

const Form = lazy(() => import("./Form"));

interface User {
  username: string;
  email: string;
  password: string;
}
interface FormValues {
  [key: string]: string;
}

interface RegisterFormProps {
  isModal?: boolean;
  fields: Field[];
  onClose?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  isModal = false,
  fields,
  onClose,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { username, email, password } = formValues || {};

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
      <div className="mt-10 login-form mx-auto sm:w-11/12 md:w-2/3 lg:w-4/12 bg-[#26292D] border-2 border-[#35373B] rounded-lg sm:px-3 sm:py-5 lg:px-6 lg:py-10">
        <div className="text-center mb-10">
          {isModal && (
            <div
              onClick={onClose}
              className="circle cursor-pointer float-right w-[30px] h-[30px] rounded-full bg-[#131319]"
            >
              X
            </div>
          )}
          <p className="text-sm">SIGN UP</p>
          <p className="text-lg text-white font-medium">
            Create an account to continue
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
        <Suspense>
          <Form
            fields={fields}
            type="signup"
            btnText="Continue"
            setFormValues={setFormValues}
            handleSubmit={handleSignup}
          />
        </Suspense>
      </div>
    </>
  );
};

export default RegisterForm;
