function parseCoords(wdCoords) {
	return L.latLng( wdCoords.slice(7, -1).split(' ').reverse().map((s) => Number(s)) );
}

module.exports.parseWDCoords = parseCoords;
module.exports = {
	parseCoords: parseCoords,
}
