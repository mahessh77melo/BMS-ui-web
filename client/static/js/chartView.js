import { Chart } from "chart.js";
import axios from "axios";
import { showAlert } from "./authHandler";
let values = {};
let bmsChart;
const retrieveData = async function () {
	try {
		await axios.get("/values").then((res) => {
			console.log(res.data);
			values = res.data;
			if (values) {
				bmsChart = initChart();
			} else {
				showAlert("There was no data received from the backend! ;(");
			}
		});
	} catch (error) {
		console.log(error);
		showAlert("There was an error while retrieving the values of the chart");
	}
};
/**
 * Function that creates a new chart and inserts it into the DOM with the given values.
 * @returns Chart
 */
const initChart = function () {
	const ctx = document.getElementById("myChart");
	const optionsObj = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		layout: {
			padding: 20,
		},
		animation: {
			easing: "easeOutBounce",
		},
		font: {
			size: 26,
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				displayColors: true,
				backgroundColor: "#c3ecec",
				bodyColor: "#6930c3",
				titleColor: "#7400b8",
				titleMarginBottom: 10,
				padding: "10",
				titleFont: {
					family: "Lato",
					size: 16,
				},
				bodyFont: {
					family: "Lato",
					size: 14,
				},
				animation: {
					easing: "easeInOutCirc",
				},
				bodyAlign: "right",
			},
		},
	};
	const data = [
		values.currentCharge,
		values.voltage,
		values.energy,
		values.maxcurrentenergy,
		values.maxdesignenergy,
	];
	const backgroundColor = [
		"rgba(249, 65, 68, 0.5)",
		"rgba(243, 114, 44, 0.5)",
		"rgba(248, 150, 30, 0.5)",
		"rgba(249, 199, 79, 0.5)",
		"rgba(144, 190, 109, 0.5)",
		"rgba(67, 170, 139, 0.5)",
		"rgba(87, 117, 144, 0.5)",
	];
	const borderColor = [
		"#f94144",
		"#f3722c",
		"#f8961e",
		"#f9c74f",
		"#90be6d",
		"#43aa8b",
		"#577590",
	];
	const labels = [
		"Charge",
		"Voltage",
		"Energy",
		"Max-Current Energy",
		"Max-Design Energy",
	];
	// creating the chart object
	const myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels,
			datasets: [
				{
					label: "Units",
					data,
					backgroundColor,
					borderColor,
					borderWidth: 1,
					borderRadius: 3,
				},
			],
		},
		options: optionsObj,
	});
	return myChart;
};
document.addEventListener("DOMContentLoaded", retrieveData);
