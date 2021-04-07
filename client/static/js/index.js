// imports
import Chart from "chart.js";
import L from "leaflet";
// DOM Elements
const landerSection = document.querySelector(".section__lander");
const featureSection = document.querySelector(".section__features");
const mapSection = document.querySelector(".section__map");
const chartSection = document.querySelector(".section__chart");
const footerSection = document.querySelector(".section__footer");
const featureNavBtn = document.querySelector(".nav__item#features");
const mapNavBtn = document.querySelector(".nav__item#map");
const chartNavBtn = document.querySelector(".nav__item#chart");
const homeFooterBtn = document.querySelector(".footer__link#home");
const loginBtn = document.querySelector(".btn-login");
const registerBtn = document.querySelector(".footer__link#register");
const loginOverlay = document.querySelector("#login-overlay");
const registerOverlay = document.querySelector("#register-overlay");

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

const initNavigators = function () {
	const addNavigator = function (btn, targetSection) {
		btn.addEventListener("click", () => {
			targetSection.scrollIntoView();
		});
	};
	addNavigator(featureNavBtn, featureSection);
	addNavigator(mapNavBtn, mapSection);
	addNavigator(chartNavBtn, chartSection);
	addNavigator(homeFooterBtn, landerSection);
};

const initOverlays = function () {
	// to display
	loginBtn.addEventListener("click", () => {
		loginOverlay.style.display = "flex";
	});
	registerBtn.addEventListener("click", () => {
		registerOverlay.style.display = "flex";
	});

	// to hide
	const hideBoth = function () {
		[loginOverlay, registerOverlay].forEach((o) => (o.style.display = "none"));
	};
	// close button is clicked
	const closeButtons = [...document.querySelectorAll(".close-button")];
	closeButtons.forEach((btn) => btn.addEventListener("click", hideBoth));
	// overlay is clicked
	const overlays = [...document.querySelectorAll(".overlay")];
	overlays.forEach((overlay) => overlay.addEventListener("click", hideBoth));
	// escape key is pressed
	window.addEventListener("keyup", (e) => {
		if (e.key == "Escape") {
			hideBoth();
		}
	});
};

const init = function () {
	initChart();
	initMap();
	initNavigators();
	initOverlays();
};
init();
