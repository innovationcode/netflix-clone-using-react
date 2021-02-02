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

      console.log(movieDetails, ">>>>>>>>>>>>>>>>>")

      return (
            <>
            {showMovieDetails ? ( 
            <div className="moviedetail">
                  <div className="moviedetail__show">
                        <div className = "moviedetail__inner_div">
                              <div className = "moviedetail__image">
                                    {movieDetails.poster_path ? (<img src = {`${base_url}${movieDetails.poster_path}`} alt = "movie poster"/> ) : 
                                                          (<img src = {`${base_url}${movieDetails.backdrop_path}`} alt = "movie poster"/> ) }                             
                              </div>
                        {/* style = {{border:'5px solid cyan'}} */}
                              <div className = "moviedetail__text__info" style ={{color:'white'}} >
                                    <h1>{movieDetails.title}</h1>

                                    <p>{movieDetails.overview}</p>

                                    <p style ={{paddingTop:'18px', paddingBottom: '8px'}}>
                                          <span style = {{color:'gold', fontSize:'20px'}}>
                                                Release Date : 
                                          </span>
                                          &nbsp;{movieDetails.release_date}
                                    </p>

                                     {/* MOVIE  RATING  */}
                                    <div class = "movie__rating">
                                          <img src = 'https://variety.com/wp-content/uploads/2017/02/imdb1.png' 
                                               alt="imdb" 
                                               style = {{width:'50px'}}                                        
                                          ></img>
                                          <span class ="movie__rating__span">{movieDetails.vote_average}/10 ⭐ </span>
                                    </div>

                              </div>  
                              <span className = "moviedetail__close" onClick = {() => {setShowMovieDetails(false)}}>X</span>
                        </div>
                  </div>   
            </div> ) :
            (
                  null          
            )}
            </>
      )
}

export default MovieDetail;
