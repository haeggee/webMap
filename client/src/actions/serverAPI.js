/** -- The Server API --
 *  All calls and requests to the server are made in this file.
 */
import { getState, setState } from "statezero"
import { filterCollection, addToCollection } from "./map"


/**
 *  If user tries to login, check credentials and make
 *  request to server. Currently hardcoded check.
 */
export const login = () => {
    
    const credentials = getState("loginForm");

    if (credentials.username === "alex"
        && credentials.password === "@spacemaker") {
        fetch('/users/login').then(
            (res) => {
                if (res.status === 200) {
                    setState("auth", "Auth");
                } else {
                    alert("Server error, login failed")
                }
            },
            (error) => {
                console.log(error)
            }
        )

    } else {
        setState("message", "Invalid credentials.")
    }

}


/**
 * Get the polygons currently in the DB.
 */
export const getCollection = () => {
    const url = "/polygons";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            setState("collection", json.features)
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * For demonstration purposes, need to make sure the 
 * data can be reset.
 * Makes call to server to erase all data
 * and replace it with the sample data
 */
export const reset = () => {
    const urlDel = "/reset"
    const urlPost = "/polygons"
    const body = JSON.stringify(collection);
    const request = new Request(urlPost, {
        method: "post",
        body: body,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(urlDel)
        .then(res => {
            if (res.status === 200) {
                return fetch(request)
            } else {
                alert('Deleting all data failed')
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Inserting initial data failed.')
            }
        }).then(json => {
            setState("collection", json)
        }).catch(error => {
            alert('Reset failed.')
            console.log(error)
        })

}
/**
 * 
 * @param {[Feature]} oldFeatures - the features to delete from the DB 
 * @param {[Feature]} newFeatures - the features to add to the DB
 */
export const replace = (oldFeatures, newFeatures) => {
    // create delete request
    const url = "/polygons"
    const bodyDel = {
        type: "FeatureCollection",
        features: oldFeatures
    };
    const requestDel = new Request(url, {
        method: "delete",
        body: JSON.stringify(bodyDel),
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // create post request
    const bodyPost = {
        type: "FeatureCollection",
        features: newFeatures
    };
    const requestPost = new Request(url, {
        method: "post",
        body: JSON.stringify(bodyPost),
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // chain requests
    fetch(requestDel)
        .then(res => {
            if (res.status === 200) {
                filterCollection(oldFeatures);
                return fetch(requestPost)
            } else {
                alert('Deleting polygons failed')
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Inserting new feature failed.')
            }
        }).then(json => {
            addToCollection(json);
        }).catch(error => {
            alert('Replacement failed.')
            console.log(error)
        })

}

/**
 * Keep the collection saved to be able to reset it.
 */
const collection = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -0.14007568359375,
                            51.5027589576403
                        ],
                        [
                            -0.12325286865234374,
                            51.5027589576403
                        ],
                        [
                            -0.12325286865234374,
                            51.512588580360244
                        ],
                        [
                            -0.14007568359375,
                            51.512588580360244
                        ],
                        [
                            -0.14007568359375,
                            51.5027589576403
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -0.1352691650390625,
                            51.50810140697543
                        ],
                        [
                            -0.11398315429687499,
                            51.50810140697543
                        ],
                        [
                            -0.11398315429687499,
                            51.51963895991333
                        ],
                        [
                            -0.1352691650390625,
                            51.51963895991333
                        ],
                        [
                            -0.1352691650390625,
                            51.50810140697543
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -0.13595581054687497,
                            51.49698840879303
                        ],
                        [
                            -0.11226654052734375,
                            51.49698840879303
                        ],
                        [
                            -0.11226654052734375,
                            51.50510971251776
                        ],
                        [
                            -0.13595581054687497,
                            51.50510971251776
                        ],
                        [
                            -0.13595581054687497,
                            51.49698840879303
                        ]
                    ]
                ]
            }
        }
    ]
}
