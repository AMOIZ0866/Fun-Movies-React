import React  from "react";


// Submit button
const Subbutton = ({ type,  onClick, buttonText }) => (
  <div className="text-center p-2">
    <button
      className="btn btn-primary"
      type={type}
      onClick={onClick}
    ><span className="p-5">{buttonText}</span></button>
  </div>
);


export default Subbutton;