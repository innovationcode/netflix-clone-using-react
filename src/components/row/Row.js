import React, { useState, useEffect } from "react";
import axios from "../../Data/axios.js";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ rowTitle, fetchUrl, isLargeRow }) => {
  // console.log("rowTitle, fetchUrl, isLargeRow  ---- ", rowTitle, fetchUrl, isLargeRow);
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  
  //A snippet of code which runs based on a specific data provided
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // [fetchUrl] -- means useEffect is dependent on fetchUrl .. so whenever fetchUrl changes useEffect will run and fetch movies according to fecthUrl provided

  
  const opts = {
    height: "650",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //this handleclick will setTrailerUrl if video running then on click set Url to empty either search setTrailer url with movie name and search in youtube
  //and get value of 'v' which will get autoplayed as mentioned in opts
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      {/* rowTitle */}
      <h2 style = {{fontWeight: '500',
                    fontSize: '26px',
                    textTransform: 'none',
                    fontFamily: "Roboto !important"}}
      > {rowTitle}  
      </h2>

      {/* container-- movie posters */}
      <div className="row__posters">
        {movies.map((movie, index) => (
          <div className={`row__poster ${isLargeRow && "row__posterLarge"}`}>
              <img
                onClick={() => handleClick(movie)}
                key={movie.id}
                className = "movie__image"
                
                // className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                // if isLargeRow display poster_path bigger size posters or display backdrop_path
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt="movie poster"
              />

              <div className = "row__poster__info">
                  {movie.name ? (<p>{movie.name}</p>) : (<p>{movie.title}</p>)}
                  <p>{movie.overview.substring(0,100)}</p>
              </div> 
          </div>
        ))}
      </div>

      {/* ************************************************************************************************************************* */}

      {/* <div className="row__posters">
        {movies.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            // if isLargeRow display poster_path bigger size posters or display backdrop_path
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt="movie poster"
          />
        ))}
      </div> */}

      {/* ************************************************************************************************************************* */}

      {trailerUrl ? (
        <div className="movie-trailer-window">
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

          <button className="close__button" onClick={() => setTrailerUrl("")}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Row;
