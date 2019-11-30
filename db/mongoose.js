/* This module will hold the connection to 
   the mongo server through the Mongoose API. */
   const mongoose = require('mongoose')

   /* Connnect to the database */
   // Get the URI of the local database, or the one specified on deployment.
   const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webMap'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
   
   module.exports = { mongoose }  // Export the active connection.