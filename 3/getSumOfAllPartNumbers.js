import fs from "fs";

const filePath = "./puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let engineSchematicArray = [];

for (const line of lines) {
	engineSchematicArray.push(line.split(""));
}

let sumOfAllPartNumbers = 0;
const symbols = new Set(["@", "#", "=", "*", "+", "$", "&", "%", "/", "-"]);
const startIndicesOfPartNumbers = new Map();

const isAdjacentToSymbol = (row, startingColumnIndex, numberOfDigits) => {
	const columnIndexLeftOfNumber = startingColumnIndex - 1;
	const columnIndexRightOfNumber = startingColumnIndex + numberOfDigits;
	const rowIndexAboveNumber = row - 1;
	const rowIndexBelowNumber = row + 1;

	if (
		columnIndexLeftOfNumber >= 0 &&
		symbols.has(engineSchematicArray[row][columnIndexLeftOfNumber])
	) {
		return true;
	}

	if (
		columnIndexRightOfNumber < engineSchematicArray[0].length &&
		symbols.has(engineSchematicArray[row][columnIndexRightOfNumber])
	) {
		return true;
	}

	if (rowIndexAboveNumber >= 0) {
		for (
			let i = startingColumnIndex;
			i < startingColumnIndex + numberOfDigits;
			i++
		) {
			if (symbols.has(engineSchematicArray[rowIndexAboveNumber][i])) {
				return true;
			}
		}
	}

	if (rowIndexBelowNumber < engineSchematicArray.length) {
		for (
			let i = startingColumnIndex;
			i < startingColumnIndex + numberOfDigits;
			i++
		) {
			if (symbols.has(engineSchematicArray[rowIndexBelowNumber][i])) {
				return true;
			}
		}
	}

	if (
		columnIndexLeftOfNumber >= 0 &&
		rowIndexAboveNumber >= 0 &&
		symbols.has(
			engineSchematicArray[rowIndexAboveNumber][columnIndexLeftOfNumber]
		)
	) {
		return true;
	}

	if (
		columnIndexLeftOfNumber >= 0 &&
		rowIndexBelowNumber < engineSchematicArray.length &&
		symbols.has(
			engineSchematicArray[rowIndexBelowNumber][columnIndexLeftOfNumber]
		)
	) {
		return true;
	}

	if (
		columnIndexRightOfNumber < engineSchematicArray[0].length &&
		rowIndexAboveNumber >= 0 &&
		symbols.has(
			engineSchematicArray[rowIndexAboveNumber][columnIndexRightOfNumber]
		)
	) {
		return true;
	}

	if (
		columnIndexRightOfNumber < engineSchematicArray[0].length &&
		rowIndexBelowNumber < engineSchematicArray.length &&
		symbols.has(
			engineSchematicArray[rowIndexBelowNumber][columnIndexRightOfNumber]
		)
	) {
		return true;
	}

	return false;
};

for (let i = 0; i < engineSchematicArray.length; i++) {
	let numberString = "";

	for (let j = 0; j < engineSchematicArray[i].length; j++) {
		const currentCharacter = engineSchematicArray[i][j];

		if (!isNaN(parseInt(currentCharacter))) {
			numberString += currentCharacter;
		} else {
			const numberOfDigits = numberString.length;

			if (numberOfDigits) {
				startIndicesOfPartNumbers.set(parseInt(numberString), [
					i,
					j - numberOfDigits,
				]);
			}

			numberString = "";
		}
	}
}

for (const [number, coordinates] of startIndicesOfPartNumbers) {
	if (
		isAdjacentToSymbol(
			coordinates[0],
			coordinates[1],
			Number.toString(number).length
		)
	) {
		sumOfAllPartNumbers += number;
	}
}

console.log(sumOfAllPartNumbers);