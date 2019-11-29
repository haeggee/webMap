import React from 'react';
import './App.css';
import Mainview from './components/Mainview'
import Login from './components/Login'
import { getState, subscribe } from "statezero"

function App() {
  // check if user authenticated
  const [auth, setAuth] = React.useState(getState("auth"));
  // subscribe to state changes
  subscribe(() => setAuth(getState("auth")), "auth");
  
  return (
    <div className="App" >
      <header className="App-main">
        {auth === "noAuth" ? <Login /> : <Mainview />}
      </header>
    </div>
  );
}

export default App;
