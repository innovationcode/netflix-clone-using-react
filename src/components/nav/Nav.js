import React, { useState, useEffect } from "react";
import firebase from 'firebase';
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
  }, []);

  const signOut = () => {
      firebase.auth().signOut();
      setUser('');
  }

  return (
    <div className={`nav ${show && "nav__black"}`}>
      {/* if show is true add nav_black className */}
      <img
        className="nav__logo"
        //src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        src = "https://www.androidpolice.com/wp-content/uploads/2015/02/nexus2cee_Netflix_Logo_Digital-Video-e1424532515143.png"
        alt="Netflix Logo"
      />
      <div>
        {/* <p style = {{color: 'white'}}>My Watchlist</p> */}
        <button className="nav__avatar"
                onClick = {signOut}  
        >
            Sign Out
        </button>
      </div>
    </div>
  );
};

export default Nav;
