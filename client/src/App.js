import React from 'react';
import './App.css';
import Mainview from './components/Mainview'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Mainview />
        <p
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's get started!
        </p>
      </header>
    </div>
  );
}

export default App;
