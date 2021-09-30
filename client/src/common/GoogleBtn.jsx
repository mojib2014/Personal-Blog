import React from "react";
import google from "../icons/icons8-google-48.png";

export default function GoogleBtn() {
  return (
    <div className="google-icon-div">
      <img src={google} alt="google" />
      <p>Login with google</p>
    </div>
  );
}
