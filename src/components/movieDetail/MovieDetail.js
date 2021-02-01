import React, {useState, useEffect} from 'react';
import axios from "../../Data/axios.js";

import './MovieDetail.css'

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieDetail = ({ movie_id }) => {
      const [movieDetails, setMovieDetails] = useState({});
      const [showMovieDetails, setShowMovieDetails] = useState(false)

      useEffect(() => {
            async function fetchData() {
              const request = await axios.get(`/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
              setMovieDetails(request.data);
              setShowMovieDetails(true)

              return request;
            }
            fetchData();
      }, [movie_id]);


      return (
            <>
            {showMovieDetails ? ( 
            <div className="moviedetail">
                  <div className="moviedetail__show">
                        <div className = "moviedetail__image">
                              {movieDetails.poster_path ? (<img src = {`${base_url}${movieDetails.poster_path}`} alt = "movie poster"/> ) : 
                                                          (<img src = {`${base_url}${movieDetails.backdrop_path}`} alt = "movie poster"/> ) }                             
                        </div>
                        
                        <div className = "moviedetail__text__info">
                              <h1>{movieDetails.title}</h1>
                        </div>  
                        <span className = "moviedetail__close" onClick = {() => {setShowMovieDetails(false)}}>X</span>
    
                  </div>   
            </div> ) :
            (
                  null          
            )}
            </>
      )
}

export default MovieDetail;
