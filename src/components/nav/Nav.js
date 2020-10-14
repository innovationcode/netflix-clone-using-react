import React, { useState, useEffect } from "react";
import "./Nav.css";

const Nav = ({ setUser }) => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  const signOut = () => {
      window.localStorage.removeItem('user')
      setUser('')
  }

  return (
    <div className={`nav ${show && "nav__black"}`}>
      {/* if show is true add nav_black className */}
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
      <button className="nav__avatar"
              onClick = {signOut}  
      >
          Sign Out
      </button>
    </div>
  );
};

export default Nav;
