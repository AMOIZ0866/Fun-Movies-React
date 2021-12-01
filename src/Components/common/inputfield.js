import React  from "react";
export const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="form-group">
    {label && <label htmlFor="input-field" class="control-label">{label}</label>}
    <input
    className="form-control"
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);
export const Productfield = ({ value, name, onChange,readonly }) => (
  <div className="form-group">
    <input
    className="form-control input-md" style={{width:"250px"}}
      type="text"
      value={value}
      name={name}
      className="form-control"
      readOnly={readonly}
      onChange={onChange}
    />
  </div>
);


export const ReviewInputField = ({ value, name, placeholder, type, onChange }) => (
  <div className="form-group">
    <input
    className="form-control col-2"
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export const SearchButton = () => ({ type,  onClick, buttonText }) => (
  <div className="text-center p-2">
    <button
      className="btn btn-primary"
      type={type}
      onClick={onClick}
    ><span className="p-5">{buttonText}</span></button>
  </div>
);