import axios from "axios";
import { hideBoth } from ".";

// DOM elements
const RegisterForm = document.querySelector("form#register-form");
const LoginForm = document.querySelector("form#login-form");

/**
 * Initiates the form listeners for the register and login overlay forms.
 */
const initFormListeners = function () {
	RegisterForm.addEventListener("submit", (e) => {
		e.preventDefault();
		handleRegister(e);
	});
	LoginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		handleLogin(e);
	});
};
/**
 * Tells whether any of the given fields are empty
 * @param  {...String} args
 * @returns True or False
 */
const isFieldsEmpty = function (...args) {
	return args.some((arg) => arg.length === 0);
};
const clearAll = function (parentElement) {
	[...parentElement.querySelectorAll(".form__input")].forEach(
		(input) => (input.value = "")
	);
};
/**
 * Handles the register form submission, sends an axios post request to the own backend and if it is successful, gives a message
 * @param {*} e
 * @returns
 */
const handleRegister = async function (e) {
	const username = RegisterForm.querySelector('.form__input[name="username"]')
		.value;
	const password = RegisterForm.querySelector('.form__input[name="password"]')
		.value;
	const carNumber = RegisterForm.querySelector('.form__input[name="carNumber"]')
		.value;
	const passwordSecond = RegisterForm.querySelector(
		'.form__input[name="passwordSecond"]'
	).value;
	console.log(username, password, carNumber, passwordSecond);
	if (password !== passwordSecond) {
		showAlert("Passwords don't match, Check it once  again");
		return;
	}
	if (isFieldsEmpty(username, password)) {
		showAlert("Empty fields");
		return;
	}
	const data = {
		username,
		password,
		carNumber,
	};
	axios
		.post("/register", data)
		.then((res) => {
			hideBoth();
			showAlert(
				`Car number ${res.data.carNumber} registered successfully with username: ${res.data.username}`
			);
			clearAll(RegisterForm);
		})
		.catch(function (error) {
			console.log(error);
		});
};
/**
 * Handles the login form submission, sends an alert if the login was successful.
 * @param {*} e
 */
const handleLogin = async function (e) {
	const username = LoginForm.querySelector('.form__input[name="username"]')
		.value;
	const password = LoginForm.querySelector('.form__input[name="password"]')
		.value;
	console.log(username, password);
	const data = { username, password };
	if (isFieldsEmpty(username, password)) {
		showAlert("Empty fields");
		return;
	}
	axios
		.post("/login", data)
		.then((res) => {
			hideBoth();
			showAlert(`Logged in as ${res.data.username}!`);
			clearAll(LoginForm);
		})
		.catch(function (error) {
			console.log(error);
		});
};

/**
 * Displays a custom alert window with the message given into it.
 * @param {String} msg
 */
const showAlert = function (msg) {
	const markup = `
	<div class="alert">
		<div class="alert__message">
		${msg}
		</div>
		<div class="alert__close">X</div>
	</div>
	`;
	const body = document.querySelector("body");
	// inserting the alert element
	body.insertAdjacentHTML("beforeend", markup);
	// alert and alert elements
	const alert = document.querySelector(".alert");
	const closeAlert = alert.querySelector(".alert__close");
	// function to remove the alert from the DOM
	const removeAlert = function () {
		alert.style.transform = "translateX(-50%) translateY(10rem)";
		setTimeout(() => {
			alert.style.display = "none";
			alert.remove();
			[...document.querySelectorAll(".alert")].forEach((al) => al.remove());
		}, 250);
	};
	// alert goes away if close button is clicked
	closeAlert.addEventListener("click", removeAlert);
	// form automatically disappears after 4 seconds
	setTimeout(removeAlert, 4000);
};
// initially called
initFormListeners();
