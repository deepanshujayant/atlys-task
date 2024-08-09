import React, { useState, lazy, Suspense } from "react";
import { Field } from "./Form";
import { useAuth } from "../Auth";

const Form = lazy(() => import("./Form"));

interface FormValues {
  [key: string]: string;
}

interface LoginFormProps {
  isModal?: boolean;
  fields: Field[];
  onClose?: () => void;
  setPopupChild?: (type: "login" | "signup") => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isModal = false,
  fields,
  onClose,
  setPopupChild = () => {},
}) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [error, setError] = useState<string>("");

  const { login } = useAuth();

  const handleClick = (e: React.FormEvent): void => {
    e.preventDefault();
    const { user, password } = formValues;
    if (!login(user, password)) {
      setError("Invalid credentials");
    }
  };
  return (
    <>
      <div
        className={`mt-10 login-form sm:w-11/12 md:w-2/3 lg:w-4/12 bg-[#26292D] border-2 border-[#35373B] mx-auto rounded-lg sm:px-3 sm:py-5 lg:px-6 lg:py-10`}
      >
        <div className="text-center mb-10">
          {isModal && (
            <div
              onClick={onClose}
              className="circle cursor-pointer float-right w-[30px] h-[30px] rounded-full bg-[#131319]"
            >
              X
            </div>
          )}
          <p className="text-sm">WELCOME BACK</p>
          <p className="text-lg text-white font-medium">
            Log into your account
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Form
            isModal={isModal}
            fields={fields}
            type="login"
            btnText="Login now"
            setFormValues={setFormValues}
            handleSubmit={handleClick}
            setPopupChild={setPopupChild}
          />
        </Suspense>
      </div>
    </>
  );
};

export default LoginForm;
