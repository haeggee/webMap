import React from 'react';
import './App.css';
import Mainview from './components/Mainview'
import Login from './components/Login'

function App() {
  const [screen, setScreen] = React.useState("Auth")

  return (
    <div className="App">
      <header className="App-main">
        {screen === "noAuth" ?  <Login /> : <Mainview />}
      </header>
    </div>
  );
}

export default App;
