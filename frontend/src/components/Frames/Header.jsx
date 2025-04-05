import React from "react";
import greenLogo from "../../assets/greenBS.png"; // import the green logo
import "./Header.css"; // create a separate CSS file for Header styling

export default function Header() {
  return (
    <header className= "header">
      <img src={greenLogo} alt="Green BSTutors Logo" className="green-logo" />
      <h1> BSTutors </h1>
    </header>
  );
}