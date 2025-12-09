import React from "react";

export default function FormInput({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`form-input ${error ? "has-error" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}