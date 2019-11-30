/* The Authenticated View (after logging in) */

// Importing react-router-dom to use the React Router
// import { Route, Switch, BrowserRouter } from "react-router-dom";

import React from "react";
import Buttons from './Buttons'
import "../index.css"
import { initialize } from '../actions/map'


class MainView extends React.Component {

    componentDidMount() {
        initialize(); // initialize the map
    }
    render() {
        return (
            <div>
                <div id="map"></div>
                <div className="box">
                    <Buttons />
                </div>
            </div>
        );
    }
}

export default MainView;
