import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

const partOne = (lines) => {
	const histories = lines.map((line) =>
		line.split(/\s+/).map((value) => parseInt(value))
	);

	const predictNextValue = (array) => {
		if (!array.length) {
			return 0;
		}

		const differences = [];

		for (let i = 0; i < array.length - 1; i++) {
			differences.push(array[i + 1] - array[i]);
		}

		return array[array.length - 1] + predictNextValue(differences);
	};

	const sumOfAllPredictions = histories
		.map((history) => predictNextValue(history))
		.reduce((sum, predictedNextValue) => sum + predictedNextValue, 0);

	return sumOfAllPredictions;
};

console.log(partOne(lines))