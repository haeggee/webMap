/* Polygon mongoose model */
const GeoJSON = require('mongoose-geojson-schema')
const mongoose = require('mongoose')

const PolygonSchema = mongoose.Schema({
	type: {
		type: String,
		required: true,
		enum: ["Feature"]
	},
	geometry: {
		type: mongoose.Schema.Types.Polygon,
		required: true
	},
	properties: {
		type: Object,
		required: true,
		default: function () { return {} }
	}
}, { minimize: false }) // always store empty objects for the properties field

// custom functions can be added here, or a schema that uses the above


const PolygonFeatures = mongoose.model('PolygonFeatures', PolygonSchema)
module.exports = { PolygonFeatures }