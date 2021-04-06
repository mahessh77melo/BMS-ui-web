// Leaflet map inclusion

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

// initialising the chart
const initChart = function () {
	const ctx = document.getElementById("myChart");
	const myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["Red", "Blue", "Yellow", "Green"],
			datasets: [
				{
					label: "# of Votes",
					data: [12, 19, 3, 7],
					backgroundColor: [
						"rgba(255, 99, 132, 0.5)",
						"rgba(54, 162, 235, 0.5)",
						"rgba(255, 206, 86, 0.5)",
						"rgba(54, 162, 150, 0.5)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(54, 162, 150, 1)",
					],
					borderWidth: 1,
					borderRadius: 3,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
};
initChart();
// calling the function that manages the map
initMap();
