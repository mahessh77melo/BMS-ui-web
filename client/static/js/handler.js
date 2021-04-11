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
		alert("Passwords don't match, Check it once  again");
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
			alert(
				`Car number ${res.data.carNumber} registered successfully with username -> ${res.data.username}`
			);
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
	axios
		.post("/login", data)
		.then((res) => {
			hideBoth();
			alert(`Logged in as ${res.data.username}!`);
		})
		.catch(function (error) {
			console.log(error);
		});
};
initFormListeners();
