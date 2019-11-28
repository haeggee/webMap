/* The Authenticated View (after logging in) */

import React from "react";
// Importing react-router-dom to use the React Router
// import { Route, Switch, BrowserRouter } from "react-router-dom";

import L from 'leaflet'

class MainView extends React.Component {

    componentDidMount() {
        this.map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoiaGFlZ2dlZSIsImEiOiJjazNqNXhlMDUwMjZrM2VteXQ1cjB1dmQ5In0.ON5EyQ-YIKgxqUmvfBp2SQ'
        }).addTo(this.map);
    }
    render() {
        return (
            <div id="map"></div>
        );
    }
}

export default MainView;
