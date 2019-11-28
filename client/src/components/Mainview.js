/* The Authenticated View (after logging in) */

// Importing react-router-dom to use the React Router
// import { Route, Switch, BrowserRouter } from "react-router-dom";

import React from "react";
import L from 'leaflet'
import { Box, Button, Grid } from '@material-ui/core'
import "../index.css"

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
            <div>
                <div id="map"></div>
                <div className="box">
                    <Grid container
                        justify="center" spacing={3}
                        alignItems="center">
                        <Grid item xs={2}>
                            <Button variant="outlined"
                                color="secondary"
                                className="button"
                                display="flex"
                            >
                                Reset
                        </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained"
                                className="button"
                            >
                                Union
                        </Button>
                        </Grid>

                        <Grid item xs={2}>
                            <Button variant="contained"
                                className="button">
                                Intersect
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default MainView;
