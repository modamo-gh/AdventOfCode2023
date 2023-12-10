import fs from "fs";

const filePath = "./puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let engineSchematicArray = [];

for (const line of lines) {
	engineSchematicArray.push(line.split(""));
}

const gearAdjacencies = new Map();

let sumOfAllGearRations = 0;
const allNumbers = [];
const numberData = new Map();

const getAsteriskCoordinate = (row, startingColumnIndex, numberOfDigits) => {
	const left = startingColumnIndex - 1 >= 0 ? startingColumnIndex - 1 : 0;
	const top = row - 1 >= 0 ? row - 1 : 0;
	const right =
		startingColumnIndex + numberOfDigits < engineSchematicArray[row].length
			? startingColumnIndex + numberOfDigits
			: engineSchematicArray[row].length - 1;
	const bottom =
		row + 1 < engineSchematicArray.length
			? row + 1
			: engineSchematicArray.length - 1;

	for (let i = left; i <= right; i++) {
		if (engineSchematicArray[top][i] === "*") {
			return top * engineSchematicArray[top].length + i;
		}
	}

	for (let i = left; i <= right; i++) {
		if (engineSchematicArray[bottom][i] === "*") {
			return bottom * engineSchematicArray[bottom].length + i;
		}
	}

	if (engineSchematicArray[row][left] === "*") {
		return row * engineSchematicArray[row].length + left;
	}

	if (engineSchematicArray[row][right] === "*") {
		return row * engineSchematicArray[row].length + right;
	}

	return -1;
};

const processNumberString = (numberString, i, j) => {
	const numberOfDigits = numberString.length;

	if (numberOfDigits) {
		const number = parseInt(numberString);
		allNumbers.push(number);
		const data = [i, j - numberOfDigits, numberOfDigits];

		if (!numberData.has(number)) {
			numberData.set(number, [data]);
		} else {
			const currentData = numberData.get(number);
			currentData.push(data);
			numberData.set(number, currentData);
		}
	}
};

for (let i = 0; i < engineSchematicArray.length; i++) {
	let numberString = "";

	for (let j = 0; j < engineSchematicArray[i].length; j++) {
		const currentCharacter = engineSchematicArray[i][j];

		if (currentCharacter.match(/\d/)) {
			numberString += currentCharacter;
		} else {
			processNumberString(numberString, i, j);

			numberString = "";
		}
	}

	processNumberString(numberString, i, engineSchematicArray[i].length);

	numberString = "";
}

for (const [number, data] of numberData) {
	for (const datum of data) {
		const adjacentAsteriskCoordinate = getAsteriskCoordinate(
			datum[0],
			datum[1],
			datum[2]
		);

		if (adjacentAsteriskCoordinate >= 0) {
			if (!gearAdjacencies.has(adjacentAsteriskCoordinate)) {
				gearAdjacencies.set(adjacentAsteriskCoordinate, [number]);
			} else {
				const currentAdjacencies = gearAdjacencies.get(
					adjacentAsteriskCoordinate
				);
				currentAdjacencies.push(number);
				gearAdjacencies.set(
					adjacentAsteriskCoordinate,
					currentAdjacencies
				);
			}
		}
	}
}

for(const [gear, adjacencies] of gearAdjacencies){
	if(adjacencies.length === 2){
		const gearRatio = adjacencies[0] * adjacencies[1];
		
		sumOfAllGearRations += gearRatio;
	}
}

console.log(sumOfAllGearRations);