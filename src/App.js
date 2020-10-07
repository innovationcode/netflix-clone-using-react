import React from 'react';
import Row from './components/row/Row.js';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Netflix using RECAT.....</h1>
        <Row rowTitle = "NETFLIX ORIGINALS"/>
        <Row rowTitle = "Trending Now"/>
    </div>
  );
}

export default App;
