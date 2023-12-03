import fs from "fs";

const filePath = "./puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let engineSchematicArray = [];

for (const line of lines) {
	engineSchematicArray.push(line.split(""));
}

const symbols = new Set();
const symbolsRegex = /[^\d.]/;

for (let i = 0; i < engineSchematicArray.length; i++) {
	for (let j = 0; j < engineSchematicArray[i].length; j++) {
		if (engineSchematicArray[i][j].match(symbolsRegex)) {
			symbols.add(engineSchematicArray[i][j]);
		}
	}
}

let sumOfAllPartNumbers = 0;
const allNumbers = [];
const numberData = new Map();
const validPartsNumbers = new Set();

const isAdjacentToSymbol = (row, startingColumnIndex, numberOfDigits) => {
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
		if (
			symbols.has(engineSchematicArray[top][i]) ||
			symbols.has(engineSchematicArray[bottom][i])
		) {
			return true;
		}
	}

	if (
		symbols.has(engineSchematicArray[row][left]) ||
		symbols.has(engineSchematicArray[row][right])
	) {
		return true;
	}

	return false;
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
		if (isAdjacentToSymbol(datum[0], datum[1], datum[2])) {
			sumOfAllPartNumbers += number;
		}
	}
}

console.log(sumOfAllPartNumbers);