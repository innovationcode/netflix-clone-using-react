import React, { useState } from 'react'

const Row = ({ rowTitle }) => {
      const [movies, setMovies] = useState([]);

      return (
            <div>
                  {/* rowTitle */}
                  <h2>{rowTitle}</h2>
                  {/* container-- movie posters */}
            </div>
      )
}

export default Row;