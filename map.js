Array.prototype.random = function () {
	return this[Math.floor((Math.random()*this.length))];
}

var map;
function initmap() {
	map = L.map('map', {
		center: [51.505, -0.09],
		zoom: 0,
		zoomControl: false,
		attributionControl: false,
	});
	// map.setView([51.505, -0.09], 13); or map.setView(new L.LatLng(51.3, 0.7),9);

	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: undefined, maxZoom: undefined, attribution: osmAttrib});

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

function newAirport() {
	airport = airports.random();
	airport.name = airport.airportLabel;
	airport.wdCoords = airport._coordinate_location;
	airport.coords = getCoords(airport.wdCoords);
	airport.latlng = airport.coords;
	info.textContent = airport.airportLabel;
}

function distance(c1, c2) {
	console.log( c1, c2 )
	// return Math.sqrt( (c2.lat-c1.lat)**2 + (c2.lng-c1.lng)**2 );
	const [lat1, lon1] = [c1.lat, c1.lng];
	const [lat2, lon2] = [c2.lat, c2.lng];

 	var R = 6371e3; // metres
	var φ1 = lat1 * (Math.PI*2/360); var φ2 = lat2 * (Math.PI*2/360);
	var dφ = (lat2-lat1) * (Math.PI*2/360); var dλ = (lon2-lon1) * (Math.PI*2/360);

	var a = Math.sin(dφ/2) * Math.sin(dφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(dλ/2) * Math.sin(dλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d/1000;
}

function getCoords(wdCoords) {
	return L.latLng( wdCoords.slice(7, -1).split(' ').reverse().map((s) => Number(s)) );
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
