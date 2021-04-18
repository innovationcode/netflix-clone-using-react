import React, {useState, useEffect} from 'react';
import db from "./../../firebase/firebase.js";
import Swal from '@sweetalert/with-react'

import './MyWatchList.css';

const base_url = "https://image.tmdb.org/t/p/original";

const MyWatchList  = ({ user, setShowMyList }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [showWatchlist, setShowWatchlist] = useState(false);

    useEffect(() => {
        if(user) {
            db.collection("users")
              .doc(user?.uid)
              .collection('watch_list')
              .orderBy("release_date", "asc")
              .onSnapshot(snapshot => (
                setWatchlist(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
             ))
             setShowWatchlist(true)
        } else {
            Swal(
                <div>
                      <h1>OOPS..</h1>
                      <p style= {{paddingTop:'10px'}}>Your watchlist is empty</p>
                </div>
          )
        }
    }, [user])
    
    const removeFromWatchList = (id) => {
        db.collection("users")
              .doc(user?.uid)
              .collection('watch_list')
              .doc(id)
              .delete()
    }

    console.log("watchlist type ==>  ", (watchlist))

    return (
        <>
        {showWatchlist? (
            <div className="watchlist">
                <div className="watchlist__show">
                    <div className = "watchlist__inner_div">
                        <h2>{user.displayName } : Watchlist </h2>
                        <div className ="watchlist__display">
                            {watchlist?.map(movie => (
                                <div style={{margin: '20px'}} key={movie.id}>
                                    <h4>{movie.data.title}</h4>
                                    <img src={`${base_url}${movie.data.image}`} alt="movie poster" style={{width: '200px'}}/>
                                    <p><small>Release date : {movie.data.release_date}</small></p>
                                    <span style={{fontSize:'10px', borderBottom: '1px solid red', cursor:'pointer'}} onClick = {()=> {removeFromWatchList(movie.id)}}>remove</span>
                                </div>
                            ))}
                        </div>
                        <button className = "watchlist__close" onClick = {() => {setShowWatchlist(false); setShowMyList(false)}}>x</button>
                    </div>
                </div>
            </div>
            ) :
            (<div>
                Swal(
                    <div>
                          <h1>OOPS..</h1>
                          <p style= {{paddingTop:'10px'}}>Your watchlist is empty</p>
                    </div>
                )
            </div>
            )
        }
        </>
       
    )
}

export default MyWatchList;