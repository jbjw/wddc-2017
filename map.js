var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

var info = document.querySelector('#info');
info.textContent = 'Stratford';

for (let airport of window.airports) {
	airport.airportLabel
	airport._coordinate_location
}

function initmap() {
	map = L.map('map', {
		center: [51.505, -0.09],
		zoom: 8,
		zoomControl: false,
		attributionControl: false,
	});
	// map.setView([51.505, -0.09], 13); or map.setView(new L.LatLng(51.3, 0.7),9);

	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 8, attribution: osmAttrib});

	map.addLayer(osm);
	// osm.addTo(map);
}

initmap();

var marker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500,
}).addTo(map);

var polygon = L.polygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047],
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");



var popup = L.popup()
	.setLatLng([51.5, -0.09])
	.setContent("I am a standalone popup.")
	.openOn(map);

var guessMarker = L.marker([0, 0]).addTo(map);
var actualMarker = L.marker([0, 0]).addTo(map);
// guessMarker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var airport = airports.random();
airport.name = airport.airportLabel;
airport.wdCoords = airport._coordinate_location;
// airport.coords = getCoords(airport.wdCoords);
info.textContent = airport.airportLabel;


function getCoords( wdCoords ) {
	var sliced = wdCoords.slice(7, -1);
	console.log(sliced);
	var splitted = sliced.split(' ');
	
	return splitted.map((s) => Number(s));
}

console.log(getCoords(airport.wdCoords))

function onMapClick(e) {
	guessMarker.setLatLng(e.latLng);
	actualMarker.setLatLng()


	// clickMarker
	// 	.setLatLng(e.latlng)
	// 	.setContent("You clicked the map at " + e.latlng.toString())
	// 	.openOn(map);
}

map.on('click', onMapClick);
