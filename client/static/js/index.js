// Leaflet map inclusion
const lat = 10.79;
const long = 78.7;

const initMap = function () {
	// function to display the map
	const showMap = function ({ coords }) {
		console.log(coords);
		const { latitude: lat, longitude: long } = coords;
		const mymap = L.map("mapid").setView([lat, long], 13);
		L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(mymap);
		// marking the current location
		L.marker([lat, long])
			.addTo(mymap)
			.bindPopup("This is your current location right now.")
			.openPopup();
		// circling the accuracy error
		const circle = L.circle([lat, long], {
			color: "#4ea8de",
			fillColor: "#64dfdf",
			fillOpacity: 0.5,
			radius: 500,
		}).addTo(mymap);
	};
	// finding out the location
	navigator.geolocation?.getCurrentPosition(
		showMap.bind(this),
		() => {
			alert("We weren't able to access your current location");
		},
		{ enableHighAccuracy: true }
	);
};
// calling the function that manages the map
initMap();
