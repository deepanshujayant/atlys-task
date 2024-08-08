import React from "react";

interface FormProps {
  type: string;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
    type: string;
  }>;
  btnText: string;
  setFormValues: (prev: object) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({
  fields = [],
  type,
  btnText,
  setFormValues,
  handleSubmit,
}) => {
  const handleChange = (name: string, value: string) => {
    setFormValues((prevState: { [x: string]: string; }) => {
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
          <a href="/register" className="ml-1 text-white">
            Register →
          </a>
        </p>
      ) : (
        <>
          <p className="text-sm mt-3">
            Already have an account?
            <a href="/login" className="ml-1 text-white">
              Login →
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
