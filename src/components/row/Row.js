import React, { useState, useEffect } from "react";
import axios from "../../Data/axios.js";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ rowTitle, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  //A snippet of code which runs based on a specific data provided
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //console.log(request)
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // [fetchUrl] -- means useEffect is dependent on fetchUrl .. so whenever fetchUrl changes useEffect will run and fetch movies according to fecthUrl provided

  console.table(movies);

  return (
    <div className="row">
      {/* rowTitle */}
      <h2>{rowTitle}</h2>

      {/* container-- movie posters */}
      <div className="row__posters">
        {movies.map((movie, index) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            // if isLargeRow display poster_path bigger size posters or display backdrop_path
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
