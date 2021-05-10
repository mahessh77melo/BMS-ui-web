import axios from "axios";
import { showAlert } from "./authHandler";
// global variables
let valuesArray = [];
let bmsChart;
/**
 * Async function that sends a request to the own backend and stores the results in the global variable (values). Called after the user is logged in.
 */
export const retrieveData = async function () {
	try {
		await axios.get("/values").then((res) => {
			console.log(res.data);
			valuesArray = res.data;
			if (valuesArray.length) {
				bmsChart = initChart(valuesArray[0]);
				chartUpdater(bmsChart);
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
const initChart = function (values) {
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
					easing: "easeOutBounce",
				},
				bodyAlign: "right",
			},
		},
	};
	const data = [
		values.batteryCurrent,
		values.batteryVoltage,
		values.SOC,
		values.speed,
		values.torque,
		values.armatureCurrent,
	];
	const backgroundColor = [
		"rgba(249, 65, 68, 0.65)",
		"rgba(243, 114, 44, 0.65)",
		"rgba(248, 150, 30, 0.65)",
		"rgba(249, 199, 79, 0.65)",
		"rgba(144, 190, 109, 0.65)",
		"rgba(67, 170, 139, 0.65)",
		"rgba(87, 117, 144, 0.65)",
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
		"Battery Current",
		"Battery Voltage",
		"SOC",
		"Speed",
		"Torque",
		"Armature Current",
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

/**
 * Utility function to update the chart with the given values
 * @param {ChartObject} chart
 * @param {Object} newData
 */
const updateChart = function (chart, newData) {
	chart.data.datasets[0].data = newData;
	chart.update();
};

/**
 * Async function that keeps updating the chart with new values every second
 * @param {ChartObject} chart
 */
const chartUpdater = async function (chart) {
	let iter = 0;
	setInterval(() => {
		const data = [
			valuesArray[iter].batteryCurrent,
			valuesArray[iter].batteryVoltage,
			valuesArray[iter].SOC,
			valuesArray[iter].speed,
			valuesArray[iter].torque,
			valuesArray[iter].armatureCurrent,
		];
		// update the chart every second
		updateChart(chart, data);
		iter = iter + 1;
		if (iter == valuesArray.length) iter = 0;
	}, 1000);
};
