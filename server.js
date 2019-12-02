"use strict";

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { PolygonFeatures } = require('./models/polygon')

// to validate object IDs
const { ObjectID } = require("mongodb");

// to validate GeoJson objects
const GJV = require("geojson-validation");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-session for managing user sessions
const session = require("express-session");

// cors for testing purposes when using react server
const cors = require('cors')
app.use(cors())

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "specialsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            // expires: 60000,
            httpOnly: true
        }
    })
);


// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        // is session exists, user is logged in
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
}

// A route to login and create a session
// for simplicity, a get call
app.get("/users/login", (req, res) => {
    // here, we could make a call to our db to check if the
    // user exists
    req.session.user = true;
    res.send();
});


// possible extension: logout, create user, delete user etc.

/*********************************************************/

/*** API Routes below ************************************/

// a middleware function that checks the integrity of the request body
// i.e. we have the constraint that every request must have the same form:
// body is a featurecollection containing polygons
const checkIntegrity = (req, res, next) => {

    if (!GJV.isFeatureCollection(req.body)) {

        res.status(400).send("Not a feature collection");

    } else if (!req.body.features.every((feature) => GJV.isPolygon(feature.geometry))) {

        res.status(400).send("Features are not all polygons");

    } else {
        next();
    }

}

// a POST route to *create* polygons
app.post("/polygons", [checkIntegrity, authenticate], (req, res) => {
    // Save polygons to the database
    PolygonFeatures.insertMany(req.body.features).then(
        (docs) => {
            res.send(docs) // return inserted documents
        }, (err) => {
            console.log(err)
            res.status(400).send(err); // bad request
        }).catch((error) => {
            res.status(500).send(error) // server error
        })

});

// a GET route to get all polygons
app.get("/polygons", authenticate, (req, res) => {
    PolygonFeatures.find().then(
        polygons => {
            const collection = {
                type: "FeatureCollection",
                features: polygons
            }
            res.send(collection);
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to reset the database
app.get("/reset", authenticate, (req, res) => {

    PolygonFeatures.deleteMany({}).then(
        (result) => {
            res.send(result)
        }).catch((error) => {
            res.status(500).send(error)
        })

});

/// a DELETE route to remove polygons
app.delete("/polygons", [checkIntegrity, authenticate], (req, res) => {
    // get all ids of feature to delete
    const ids = req.body.features.map((feature) => {
        return feature._id
    })

    PolygonFeatures.deleteMany({ _id: { $in: ids } }).then(
        result => {
            res.send(result)
        }, (err) => {
            res.status(400).send(err);
        }).catch((error) => {
            res.status(500).send(error)
        })

});

// possible extensions: 
// - patch polygons by id
// - creation of other resources


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});


// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.status(404).send("Resource not found")
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
