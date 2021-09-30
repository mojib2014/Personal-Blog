import React from "react";
import facebook from "../icons/icons8-facebook-48.png";

export default function FacebookBtn() {
  return (
    <div className="facebook-icon-div">
      <img src={facebook} alt="facebook" />
      <p>Login with facebook</p>
    </div>
  );
}
