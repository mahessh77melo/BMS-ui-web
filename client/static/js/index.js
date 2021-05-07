// imports
import "./authHandler";
import "./chartView";
import "core-js/stable";
import "regenerator-runtime";

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
/**
 * Initiates the map element from the Leaflet library after retrieving the user's location through the geolocation API.
 */
const initMap = function () {
	// function to display the map
	const showMap = function ({ coords }) {
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

/**
 * Function to initiate the smooth scroll functionality when the nav buttons are clicked.
 */
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

/**
 * Function to hide both the overlay-forms. Sets the display property to "none"
 */
export const hideBoth = function () {
	[loginOverlay, registerOverlay].forEach((o) => (o.style.display = "none"));
};

/**
 * Initiates the event listeners for the overlay forms
 */
const initOverlays = function () {
	// password eye functions
	const passwordEyes = [...document.querySelectorAll("#show-password")];
	passwordEyes.forEach((p) => addPasswordViewer(p));
	// to display
	loginBtn.addEventListener("click", () => {
		loginOverlay.style.display = "flex";
	});
	registerBtn.addEventListener("click", () => {
		registerOverlay.style.display = "flex";
	});

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
/**
 * Adds an event listener to change the password fields as normal text fields so that the hidden text can be viewed at the user's will.
 * @param {HTMLElement} passwordEye
 */
const addPasswordViewer = function (passwordEye) {
	passwordEye.addEventListener("click", () => {
		const passwordElements = [
			...document.querySelectorAll(".form__input.input-password"),
		];
		// toggle the state
		passwordEye.innerHTML === " visibility_off "
			? (passwordEye.innerHTML = " visibility ")
			: (passwordEye.innerHTML = " visibility_off ");
		// toggle the visibilities
		passwordElements.forEach((el) => {
			el.type === "password" ? (el.type = "text") : (el.type = "password");
		});
	});
};

/**
 * Master function to call all the other functions
 */
const init = function () {
	initMap();
	initNavigators();
	initOverlays();
};
init();
