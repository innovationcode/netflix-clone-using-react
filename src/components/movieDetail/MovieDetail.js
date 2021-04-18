import React, {useState, useEffect} from 'react';
import axios from "../../Data/axios.js";
import ShareIcon from "@material-ui/icons/Share";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from '@material-ui/icons/Check';
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
// import Swal from 'sweetalert2';
import db from "./../../firebase/firebase.js";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Swal from '@sweetalert/with-react'


import './MovieDetail.css'

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieDetail = ({ movie_id, user }) => {
      // console.log("Movie ID => ", movie_id)
      const [movieDetails, setMovieDetails] = useState({});
      const [showMovieDetails, setShowMovieDetails] = useState(false);
      const [watchlistAdded, setWatchlistAdded] = useState(false);
      const [showNotFound, setShowNotFound] = useState(false);
      const [trailerUrl, setTrailerUrl] = useState("");
 
      useEffect(() => {
            async function fetchData() {
              const request = await axios.get(`/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            //   debugger
            //   await axios.get(`/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            //              .then(res => {
            //                    console.log("RES => ", res)
            //              })
            //              .catch((error) => {
            //                   console.error("Error : ", error);
            //              });
              if (request.status === 200) { 
                  setMovieDetails(request.data);
                  setShowMovieDetails(true);
              } else {
                  Swal(
                        <div>
                              <h1>OOPS..</h1>
                              <p style= {{paddingTop:'10px'}}>No movie details found...</p>
                        </div>
                  )
              }

              if(db.collection('users').doc(user?.uid).collection('watch_list')) {
                  db.collection('users').doc(user?.uid).collection('watch_list').doc(`${movie_id}`).get().then((snapshot) => {
                        if (snapshot.data()) {
                              setWatchlistAdded(true)
                        } else {
                              setWatchlistAdded(false)
                        }  
                  })
                  .catch((error) => {
                        console.error("Error : ", error);
                  });
              }
            
            //   return request;
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

      const twitter_click = (url, name, width, height) => {
            const u = url      
            const t = name;
            var leftPosition, topPosition;
            leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
            //Allow for title and status bars.
            topPosition = (window.screen.height / 2) - ((height / 2) + 50);
            const windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
            window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(u)+'&text='+encodeURIComponent(t),'sharer',windowFeatures);
            return false;
      }

      const handleWatchList = async () => {
            db
              .collection('users')
              .doc(user?.uid)
              .collection('watch_list').doc(`${movie_id}`)
              .set({
                  movie_id : movie_id,
                  title: movieDetails.title,
                  image: movieDetails.poster_path || movieDetails.backdrop_path,
                  release_date: movieDetails.release_date
              })
              .then(() => {
                  setWatchlistAdded(true);
              })
              .catch((error) => {
                  console.error("Error adding document: ", error);
              });
      }

      const close = () => {
            console.log("ShowNotFound : ", showNotFound)
            setShowNotFound(false)
      }

      const opts = {
            height: "600",
            width: "100%",
            playerVars: {
                autoplay: 1,
            },
      };

      const handleTrailer = (movie) => {
           if (trailerUrl) {
               setTrailerUrl("");
            } else {
                movieTrailer(movie?.title || "")
                  .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                  })
                  .catch((error) => {  
                        console.log(error)
                        Swal(
                              <div>
                                    <h1>OOPS..</h1>
                                    <p style= {{paddingTop:'10px'}}>No movie trailer found</p>
                              </div>
                        )
                  });
            }
      };

      console.log(movieDetails, ">>>>>>>>>>>>>>>>>")

      return (
            <>
            {showMovieDetails? ( 
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
                                    <div className = "movie__rating">
                                          <img src = 'https://variety.com/wp-content/uploads/2017/02/imdb1.png' 
                                               alt="imdb" 
                                               style = {{width:'50px'}}                                        
                                          ></img>
                                          <span className ="movie__rating__span">{movieDetails.vote_average}/10 ⭐ </span>
                                    </div>

                                    {/* * TRILER , Watchlist, SOCIAL SHARE ENDS* */}
                                    <div style = {{display: 'flex', justifyContent: 'center'}}></div>
                                    <div className ="moviedetail__text__bottom" style = {{alignItems:'flex-end'}}>
                                          <div className="movie__trailer">
                                                <span className="movie__trailer__top">
                                                      <PlayArrowRoundedIcon className="materialUI__icons" onClick = {() => {handleTrailer(movieDetails)}}/>
                                                </span>
                                                <span className="movie__trailer__bottom">TRAILER</span>
                                          </div> 

                                          <div className="movie__watchlist">
                                                <span className="movie__watchlist__top">
                                                      {watchlistAdded?  
                                                            (<CheckIcon className="materialUI__icons"/>) :
                                                            (<AddIcon className="materialUI__icons" onClick = {()=> handleWatchList()}/>)
                                                      }
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
                                                                  onClick={() => twitter_click(`${base_url}${movieDetails.poster_path}`, movieDetails.title, 400, 400)}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                       
                                    </div>
                                    {/* * TRILER , Watchlist, SOCIAL SHARE ENDS* */}
                              </div>
                              <span className = "moviedetail__close" onClick = {() => {setShowMovieDetails(false)}}>X</span>
                        </div>
                        {trailerUrl ? (
                              <div className="movie-trailer-window">
                                    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

                                    <button className="close__button" onClick={() => setTrailerUrl("")}>
                                          Close
                                    </button>
                              </div>
                        ) : null }
                  </div>   
            </div> ) :
            (<>
                  {showNotFound? (
                        <div className="moviedetail">
                              <div className="moviedetail__show">
                                    <div className = "moviedetail__inner_div">
                                          <h3 className = "not_found">OOPS.. movie details not found.</h3>
                                          <span className = "moviedetail__close" onClick = {() => {close()}}>X</span>
                                    </div>
                              </div>
                        </div>) : (
                  null)}</>
            )}
            </>
      )
}

export default MovieDetail;
