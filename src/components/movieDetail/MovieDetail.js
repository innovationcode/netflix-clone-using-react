import React, {useState, useEffect} from 'react';
import axios from "../../Data/axios.js";

import './MovieDetail.css'

const base_url = "https://image.tmdb.org/t/p/original/";

const MovieDetail = ({ movie_id }) => {
      const [movies, setMovies] = useState([]);

      console.log("movie_id ****** ", movie_id)

      useEffect(() => {
            async function fetchData() {
              const request = await axios.get();
              console.log(request);
              setMovies(request.data.results);
              return request;
            }
            fetchData();
          }, []);


      return (
            <div className="moviedetail">
                  <div className="moviedetail__show">MovieDetail</div>
            </div>
      )
}

export default MovieDetail;
