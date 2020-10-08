import React from "react";
import Row from "./components/row/Row.js";
import requests from "./Data/requests.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Netflix using RECAT.....</h1>
      <Row
        rowTitle="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row rowTitle="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row rowTitle="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row rowTitle="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row rowTitle="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row rowTitle="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row rowTitle="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
