import React, {useState, useEffect} from 'react';
import axios from "../../Data/axios.js";
import ShareIcon from "@material-ui/icons/Share";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

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

      const facebook_click = (url, width, height) => {
            const u = url      
            var leftPosition, topPosition;
            leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
            //Allow for title and status bars.
            topPosition = (window.screen.height / 2) - ((height / 2) + 50);
            const windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
            window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u),'sharer',windowFeatures);

            return false;
      }


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
                              {/* Movie Detail text -- name, overview, release date */}
                              <div className = "moviedetail__text__info">
                                    <h1>{movieDetails.title}</h1>

                                    <p className= "moviedetail__overview">{movieDetails.overview}</p>

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

                                    {/* * TRILER , Watchlist, SOCIAL SHARE ENDS* */}
                                    <div style = {{display: 'flex', justifyContent: 'center'}}></div>
                                    <div className ="moviedetail__text__bottom" style = {{alignItems:'flex-end'}}>
                                          <div className="movie__trailer">
                                                <span className="movie__trailer__top">
                                                      <PlayArrowRoundedIcon className="materialUI__icons" />
                                                </span>
                                                <span className="movie__trailer__bottom">TRAILER</span>
                                          </div> 

                                          <div className="movie__watchlist">
                                                <span className="movie__watchlist__top">
                                                      <AddIcon className="materialUI__icons" />
                                                </span>
                                                <span className="movie__watchlist__bottom">WATCHLIST</span>

                                          </div>

                                          <div className="movie__social__share">
                                                <span className="movie__social__share__top">
                                                      <ShareIcon
                                                            className="materialUI__icons_share"
                                                      />
                                                </span>
                                                <span
                                                      className="movie__social__share__bottom"
                                                      style={{ paddingTop: "9px" }}
                                                >
                                                      SOCIAL
                                                </span>

                                                <div className="social__share__hover">
                                                      <div className="share-wrap-inside-div">
                                                            <FacebookIcon
                                                                  className="share-social-icons"
                                                                  style={{ color: "#3b5998" }}
                                                                  onClick={() => facebook_click(`${base_url}${movieDetails.poster_path}`, 400, 400)}
                                                            />
                                                      </div>
                                                      <div className="share-wrap-inside-div">
                                                            <TwitterIcon
                                                                  className="share-social-icons"
                                                                  style={{ color: "#1da1f2" }}
                                                                  // onClick={() => twitter_click(doc.url, doc.name, 400, 400)}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                       
                                    </div>
                                    {/* * TRILER , Watchlist, SOCIAL SHARE ENDS* */}
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
