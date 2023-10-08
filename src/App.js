import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [value, setValue]=useState("");
  useEffect (()=>{
    fetch(".netlify/functions/note-fetch-test")
    .then(x=>x.json())
    .then(data=>setValue(data))
  }, [])

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
          Learn React, I dont know how to learn it static
          here is my environment variable, let me guess is it: {process.env.REACT_APP_MY_KEY} , {process.env.MY_KEY}
          Let me guess what you got:  {value.msg}
        </a>
      </header>
    </div>
  );
}

export default App;
