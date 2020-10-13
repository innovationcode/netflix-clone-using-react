import React from "react";
import Row from "./components/row/Row.js";
import requests from "./Data/requests.js";
import Banner from "./components/banner/Banner.js";
import Nav from "./components/nav/Nav.js";
import Login from './components/login/Login.js'
import "./App.css";

function App() {
  const [user, setUser] = window.localStorage.getItem('user')

  return (
    <div className="App">
      {!user ? <h1 style = {{color:"cornsilk"}}><Login /></h1> : (
        <>
        <Nav />
        <Banner />
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
        </>
      )}
    </div>
  );
}

export default App;
