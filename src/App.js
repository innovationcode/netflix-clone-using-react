import React from 'react';
import Row from './components/row/Row.js';
import requests from './Data/requests.js';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Netflix using RECAT.....</h1>
        <Row rowTitle = "NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals}/>
        <Row rowTitle = "Trending Now" fetchUrl = {requests.fetchTrending}/>
    </div>
  );
}

export default App;
