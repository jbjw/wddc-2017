// import airports from './airports.js';
// import latlng-distance fr
let airports = require('./airports.js');
let distance = require('./latlng-distance.js');
let wdParser = require('./wikidata-parser.js');
let parseWDCoords = wdParser.parseCoords;

Array.prototype.random = function () {
	return this[Math.floor((Math.random()*this.length))];
}
Array.random = function (arr) {
	return arr[Math.floor((Math.random()*arr.length))];
}

var map;
function initmap() {
	map = L.map('map', {
		center: [51.505, -0.09],
		zoom: 0,
		zoomControl: false,
		attributionControl: false,

		zoomSnap: 0,
		// zoomDelta: 0.1,
		// maxBounds: bounds,
		maxBoundsViscocity: 1.0,
	});

	// FIGURE THIS OUT

	map.fitWorld()

	// zoom to exact map size, block bounds, etc

	// maxBounds
	// setMaxBounds
	// map.getBounds

	// map.setView([51.505, -0.09], 13); or map.setView(new L.LatLng(51.3, 0.7),9);

	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: undefined, attribution: osmAttrib});

	map.addLayer(osm);
	// osm.addTo(map);
}

// var marker = L.marker([51.5, -0.09]).addTo(map);

// var circle = L.circle([51.508, -0.11], {
// 	color: 'red',
// 	fillColor: '#f03',
// 	fillOpacity: 0.5,
// 	radius: 500,
// }).addTo(map);

// var polygon = L.polygon([
// 	[51.509, -0.08],
// 	[51.503, -0.06],
// 	[51.51, -0.047],
// ]).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// var popup = L.popup()
// 	.setLatLng([51.5, -0.09])
// 	.setContent("I am a standalone popup.")
// 	.openOn(map);

let airport;
function newAirport() {
	airport = Array.random(airports);

	airport.name = airport.airportLabel;
	airport.wdCoords = airport._coordinate_location;
	airport.coords = parseWDCoords(airport.wdCoords);
	airport.latlng = airport.coords;
	info.textContent = airport.airportLabel;
}

var guessMarker = L.marker([0, 0]);
var actualMarker = L.marker([0, 0]);

function init() {
	var airport;

	var info = document.querySelector('#info');
	info.textContent = 'unset';

	initmap();

	reset();
}

function reset() {
	newAirport();
	guessMarker.remove();
	actualMarker.remove();
}

function guess(latlng) {
	guessMarker.addTo(map).setLatLng(latlng);
	actualMarker.addTo(map).setLatLng(airport.latlng);
	info.textContent = distance(airport.coords, latlng);
}
// var getCoords = (wdc) => {wdCoords.slice(7, -1).split(' ').map((s) => Number(s))};
// why didn't lambda assignment work?

init();

document.addEventListener('keypress', function (e) {
	if (e.code == "Space") {
		reset();
	}
});

function guessClick(e) {
	guess(e.latlng);
}

map.on('click', guessClick);
// map.off('click', guessClick);

map.on('zoom', function (e) {
	console.log(map.getZoom());
});
