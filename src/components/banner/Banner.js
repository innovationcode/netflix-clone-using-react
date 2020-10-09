import Axios from "axios";
import React, { useState, useEffect } from "react";
import axios from "./../../Data/axios.js";
import requests from "../../Data/requests.js";

import "./Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  //to show random movie poster and info in banner...
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      {" "}
      {/* Background image for banner */}
      {/* title */}
      {/* Buttons play.. */}
      {/* description */}
    </header>
  );
};

export default Banner;
