function distance(c1, c2) {
	// return Math.sqrt( (c2.lat-c1.lat)**2 + (c2.lng-c1.lng)**2 );
	const [lat1, lon1] = [c1.lat, c1.lng];
	// const {lat: lat1, lng: lng1} = c1;

	const [lat2, lon2] = [c2.lat, c2.lng];
	// const {lat: lat2, lng: lng2} = c2;

 	var R = 6371e3; // metres
	var φ1 = lat1 * (Math.PI*2/360);
	var φ2 = lat2 * (Math.PI*2/360);
	var dφ = (lat2-lat1) * (Math.PI*2/360);
	var dλ = (lon2-lon1) * (Math.PI*2/360);

	var a = Math.sin(dφ/2) * Math.sin(dφ/2) +
		Math.cos(φ1) * Math.cos(φ2) *
		Math.sin(dλ/2) * Math.sin(dλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d/1000;
}

module.exports = distance;
