interface FormProps {
  type: string;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
    type: string;
  }>;
  btnText: string;
  handleSubmit: (event: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ fields = [], type, btnText, handleSubmit }) => {
  return (
    <div>
      <form className="form">
        {fields.map(({ label, placeholder, type, id }) => (
          <div key={id} className="form-group">
            <label htmlFor="email">{label}</label>
            <input id={id} type={type} placeholder={placeholder} />
          </div>
        ))}
        <button
          onClick={handleSubmit}
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
