import React, { useEffect, useState } from "react";
import Row from "./components/row/Row.js";
import requests from "./Data/requests.js";
import Banner from "./components/banner/Banner.js";
import Nav from "./components/nav/Nav.js";
import Login from './components/login/Login.js'
import { auth } from './firebase/firebase.js';

import "./App.css";

function App() {
  const [user, setUser] = useState('');
  const [pending, setPending] = useState(true);

  console.log("USER -->> ", user)


  useEffect(() => {
      auth.onAuthStateChanged((user) => { //to keep user sign-in on refresh i.e. unless sign-out
        setUser(user)
        setPending(false)
      })}, 
  []);

  if(pending) {
    return <>Loading...</>
  }
  

  return (
    <div className="App">
      {!user ? <h1 style = {{color:"cornsilk"}}><Login setUser = {setUser}/></h1> : (
        <>
        <Nav setUser = {setUser}/>
        <Banner user= {user}/>
        <Row
          rowTitle="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          user= {user}
        />
        <Row rowTitle="Trending Now" fetchUrl={requests.fetchTrending} user= {user} />
        <Row rowTitle="Action Movies" fetchUrl={requests.fetchActionMovies} user= {user} />
        <Row rowTitle="Comedy Movies" fetchUrl={requests.fetchComedyMovies} user= {user} />
        <Row rowTitle="Horror Movies" fetchUrl={requests.fetchHorrorMovies} user= {user} />
        <Row rowTitle="Romance Movies" fetchUrl={requests.fetchRomanceMovies} user= {user} />
        <Row rowTitle="Documentaries" fetchUrl={requests.fetchDocumentaries} user= {user} />
        </>
      )}
    </div>
  );
}

export default App;
