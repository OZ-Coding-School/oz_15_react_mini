export const LoginSignupInput = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  error,
}) => {
  return (
    <div>
      <label className="block text-lg">{label}</label>

      <input
        className="border rounded-sm p-2 m-2 w-full"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {error && (
        <p className="flex justify-center text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};
