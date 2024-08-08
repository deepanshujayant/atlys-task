import React, { lazy } from "react";
import { Field } from "./Form";

const Form = lazy(() => import("./Form"));

interface RegisterFormProps {
  isModal?: boolean;
  error: string;
  success: string;
  fields: Field[];
  setFormValues: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  handleSignup: (event: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  error,
  success,
  isModal = false,
  fields,
  setFormValues,
  handleSignup,
}) => {
  return (
    <>
      <div className="mt-10 login-form sm:w-11/12 md:w-2/3 lg:w-4/12 bg-[#26292D] border-2 border-[#35373B] rounded-lg sm:px-3 sm:py-5 lg:px-6 lg:py-10">
        <div className="text-center mb-10">
          {isModal && (
            <div
              onClick={() => {}}
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
        <Form
          fields={fields}
          type="signup"
          btnText="Continue"
          setFormValues={setFormValues}
          handleSubmit={handleSignup}
        />
      </div>
    </>
  );
};

export default RegisterForm;
