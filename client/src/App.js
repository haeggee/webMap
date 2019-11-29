import React from 'react';
import './App.css';
import Mainview from './components/Mainview'
import Login from './components/Login'
import { getState, subscribe } from "statezero"

class App extends React.Component {

  componentDidMount() {
    // check if user is authenticated
    const callback = () => this.setState({
      auth: getState("auth")
    })
    // subscribe to state changes to rerender
    subscribe(callback, "auth");
  }

  render() {
    const auth = getState("auth");
    console.log(auth)
    return (
      <div className="App" >
        <header className="App-main">
          {auth === "noAuth" ? <Login /> : <Mainview />}
        </header>
      </div>
    );
  }
}

export default App;
