import { getState, setState } from "statezero";
import { getCollection } from "./serverAPI"
import * as turf from "@turf/turf"
import L from 'leaflet'

// Initialize all state paths used by the app as empty.
// Could easily be extended to more attributes

// - auth state path is used by the root App component to check if user is logged in
// - message is used by Login component to give error message if wrong credentials used
// - allPolygons is used by Mainview component
// - selectedPolygons state path is used by the Mainview component

export const setEmptyState = () => {
    setState("auth", "Auth");
    setState("message", "");
    setState("geoLayer", null);
    setState("selectedPolygons", []);
};

let map = null;
let geoLayer = L.geoJSON(undefined, {
    onEachFeature: (feature, layer) => {
        layer.setStyle({ fillColor: 'blue', color: 'blue', fillOpacity: 0.3, strokeWidth: 0.4 })
        layer.on('click', () => layerClick(feature, layer))
    }
})

export const initialize = () => {
    map = L.map('map').setView([51.507, -0.123], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiaGFlZ2dlZSIsImEiOiJjazNqNXhlMDUwMjZrM2VteXQ1cjB1dmQ5In0.ON5EyQ-YIKgxqUmvfBp2SQ'
    }).addTo(map);

    const collection = getCollection(); // server call

    geoLayer.addTo(map);
    geoLayer.addData(collection)
    console.log(geoLayer)
}

export const updateLoginForm = (field) => {
    const { name, value } = field;
    setState(`loginForm.${name}`, value);
};

export const layerClick = (feature, layer) => {
    const selectedPolygons = getState("selectedPolygons");
    console.log(selectedPolygons)
    // assume no duplicates
    const filteredPolygons = selectedPolygons.filter((element) => !turf.booleanEqual(element.feature, feature));
    if (filteredPolygons.length !== selectedPolygons.length) {
        setState("selectedPolygons", filteredPolygons)
        layer.setStyle({ fillColor: 'blue', fillOpacity: 0.3 })
    } else if (selectedPolygons.length < 2) {
        layer.setStyle({ fillColor: 'red', fillOpacity: 0.7 })
        setState("selectedPolygons", selectedPolygons.concat([{ layerid: layer._leaflet_id, feature: feature }]))
    }
}

export const unionClick = () => {
    const selectedPolygons = getState("selectedPolygons");
    if (selectedPolygons.length < 2) {
        alert("You need to select two polygons.")
    } else {
        const poly_1 = selectedPolygons[0];
        const poly_2 = selectedPolygons[1];

        if (!turf.booleanDisjoint(poly_1.feature, poly_2.feature)) {
            const newFeature = turf.union(poly_1.feature, poly_2.feature)
            // server call here 
            geoLayer.removeLayer(poly_1.layerid)
            geoLayer.removeLayer(poly_2.layerid)
            geoLayer.addData(newFeature)
            setState("selectedPolygons", [])
        } else {
            alert('Polygons do not overlap')
        }
    }
}

export const intersectClick = () => {
    const selectedPolygons = getState("selectedPolygons");
    if (selectedPolygons.length < 2) {
        alert("You need to select two polygons.")
    } else {

        const poly_1 = selectedPolygons[0];
        const poly_2 = selectedPolygons[1];

        const newFeature = turf.intersect(poly_1.feature, poly_2.feature)
        if (newFeature) {
            // server call here 
            geoLayer.removeLayer(poly_1.layerid)
            geoLayer.removeLayer(poly_2.layerid)
            geoLayer.addData(newFeature)
            setState("selectedPolygons", [])
        } else {
            alert('Polygons do not overlap')
        }
    }
}

export const resetClick = () => {
    setState("selectedPolygons", []);
    const collection = getCollection(); // server call
    geoLayer.clearLayers();
    geoLayer.addData(collection);
}