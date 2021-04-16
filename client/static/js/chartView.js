import { Chart } from "chart.js";
import axios from "axios";
let values = {};
let bmsChart;
const retrieveData = async function () {
	try {
		await axios.get("/values").then((res) => {
			console.log(res.data);
			values = res.data;
			bmsChart = initChart();
		});
	} catch (error) {
		showAlert("There was an error while retrieving the values of the chart");
	}
};
/**
 * Function that creates a new chart and inserts it into the DOM with the given values.
 * @returns Chart
 */
const initChart = function () {
	const ctx = document.getElementById("myChart");
	const myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: [
				"Charge",
				"Voltage",
				"Energy",
				"Max-Current Energy",
				"Max-Design Energy",
			],
			datasets: [
				{
					label: "Units",
					data: [
						values.currentCharge,
						values.voltage,
						values.energy,
						values.maxcurrentenergy,
						values.maxdesignenergy,
					],
					backgroundColor: [
						"rgba(249, 65, 68, 0.5)",
						"rgba(243, 114, 44, 0.5)",
						"rgba(248, 150, 30, 0.5)",
						"rgba(249, 199, 79, 0.5)",
						"rgba(144, 190, 109, 0.5)",
						"rgba(67, 170, 139, 0.5)",
						"rgba(87, 117, 144, 0.5)",
					],

					borderColor: [
						"#f94144",
						"#f3722c",
						"#f8961e",
						"#f9c74f",
						"#90be6d",
						"#43aa8b",
						"#577590",
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
	return myChart;
};

retrieveData();
