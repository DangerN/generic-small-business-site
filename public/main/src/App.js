import React from 'react';
import logo from './logo.svg';
import './App.css';

// import { Button, Card, Row, Col } from 'react-materialize';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          I'm the main page!
        </a>
      </header>
    </div>
  );
}

export default App;
