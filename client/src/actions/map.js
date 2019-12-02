import { getState, setState, subscribe } from "statezero";
import { getCollection, reset, replace } from "./serverAPI"
import * as turf from "@turf/turf"
import L from 'leaflet'


// Initialize all state paths used by the app as empty.
// Could easily be extended to more attributes

// - auth state path is used by the root App component to check if user is logged in
// - message is used by Login component to give error message if wrong credentials used
// - collection is the array of all polygons in our map
// - selectedPolygons state path is the current selection of the user

export const setEmptyState = () => {
    setState("auth", "noAuth");
    setState("message", "");
    setState("selectedPolygons", []);
    setState("collection", null)
};

// this is the object that will render our map
let map = null;
let geoLayer = L.geoJSON(undefined, {
    onEachFeature: (feature, layer) => {
        layer.setStyle({ fillColor: 'blue', color: 'blue', fillOpacity: 0.3, weight: 1 })
        layer.on('click', () => layerClick(feature, layer))
    }
})

// initialize the map once the page has been loaded
export const initialize = () => {
    map = L.map('map').setView([51.507, -0.123], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiaGFlZ2dlZSIsImEiOiJjazNqNXhlMDUwMjZrM2VteXQ1cjB1dmQ5In0.ON5EyQ-YIKgxqUmvfBp2SQ'
    }).addTo(map);

    geoLayer.addTo(map);

    getCollection(); // server call to get initial data

    // every time the collection changes, 
    // we change the geoLayer accordingly
    subscribe((nextState, prevState) => {
        if (nextState) {
            geoLayer.clearLayers();
            geoLayer.addData(nextState)
        }
    }, "collection");

}
/**
 * Filter out specific features in the collection.
 * @param {[Feature]} features to be filtered out  
 */
export const filterCollection = (features) => {

    const filter = (feature) => {
        const bools = features.map((feature1) => {
            return feature1._id === feature._id; // id of mongoDB is unique
        });
        return !bools.includes(true);
    }
    setState("collection", getState("collection").filter(filter))
}
/**
 * Add a list of features to the collection
 * @param {[Feature]} features 
 */
export const addToCollection = (features) => {
    // need to copy the array using splice to be able to add to it
    const currentColl = getState("collection").slice();
    setState("collection", currentColl.concat(features))
}


/**
 * If the user clicks a polygon, either add it to
 * selection or remove it.
 * @param {Feature} feature - the feature that has been clicked
 * @param {Layer} layer - the associated layer 
 */
export const layerClick = (feature, layer) => {
    const selectedPolygons = getState("selectedPolygons");

    // get the current selection, without this feature 
    const filteredPolygons = selectedPolygons.filter((element) => {
        return !turf.booleanEqual(element.feature, feature)
    });
    if (filteredPolygons.length !== selectedPolygons.length) {
        // remove feature
        setState("selectedPolygons", filteredPolygons)
        layer.setStyle({ fillColor: 'blue', fillOpacity: 0.3 })
    } else if (selectedPolygons.length < 2) {
        // add
        layer.setStyle({ fillColor: 'red', fillOpacity: 0.7 })
        setState("selectedPolygons", selectedPolygons.concat([{ layerid: layer._leaflet_id, feature: feature }]))
    }
    // otherwise, already two selected
}


/**
 * If the user clicks on Button Union, create
 * new feature and make server call.
 */

export const unionClick = () => {
    const selectedPolygons = getState("selectedPolygons");
    if (selectedPolygons.length < 2) {
        alert("You need to select two polygons.")
    } else {
        const poly_1 = selectedPolygons[0];
        const poly_2 = selectedPolygons[1];
        // -- assumption: polygons must overlap --
        if (!turf.booleanDisjoint(poly_1.feature, poly_2.feature)) {
            const newFeature = turf.union(poly_1.feature, poly_2.feature)
            // server call here 
            replace([poly_1.feature, poly_2.feature], [newFeature])
            setState("selectedPolygons", [])

        } else {
            alert('Polygons do not overlap')
        }
    }
}

/**
 * If the user clicks on Button Intersect, create
 * new feature and make server call.
 */

export const intersectClick = () => {
    const selectedPolygons = getState("selectedPolygons");
    if (selectedPolygons.length < 2) {
        alert("You need to select two polygons.")
    } else {

        const poly_1 = selectedPolygons[0];
        const poly_2 = selectedPolygons[1];
        // -- assumption: polygons must overlap --
        const newFeature = turf.intersect(poly_1.feature, poly_2.feature)
        if (newFeature) {
            // server call here 
            replace([poly_1.feature, poly_2.feature], [newFeature])
            setState("selectedPolygons", [])
        } else {
            alert('Polygons do not overlap')
        }
    }
}
/**
 * If Reset Button clicked, make server call and get initial state back. 
 */
export const resetClick = () => {
    geoLayer.clearLayers();
    setState("selectedPolygons", []);
    reset();
}