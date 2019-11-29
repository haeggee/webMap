/* The Authenticated View (after logging in) */

// Importing react-router-dom to use the React Router
// import { Route, Switch, BrowserRouter } from "react-router-dom";

import React from "react";
import Buttons from './Buttons'
import "../index.css"
import { getCollection } from '../actions/serverAPI'
import { layerClick, initialize } from '../actions/helpers'
import { setState } from "statezero"

class MainView extends React.Component {

    componentDidMount() {
        initialize();
        // geoLayer.on('click', (e) => {
        //     console.log(e)
        //     e.layer.setStyle({fillColor: 'red'})
        // })
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
