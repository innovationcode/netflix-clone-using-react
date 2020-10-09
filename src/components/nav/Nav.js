import React from "react";
import "./Nav.css";

const Nav = () => {
  const user = "Lina";
  return (
    <div className="nav">
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        alt="Netflix Logo"
      />
      {/* <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Profile"
      /> */}
      <button className="nav__avatar">Sign In</button>
    </div>
  );
};

export default Nav;
