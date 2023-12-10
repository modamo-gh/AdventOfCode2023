import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

const sketch = [];

lines.forEach((line) => {
	sketch.push(line.split(""));
});

const sIndex = lines.join("").indexOf("S");
const sCoordinates = [Math.floor(sIndex / lines.length), sIndex % lines.length];

const symbolRelations = new Map();
const validUpSymbols = new Set(["|", "7", "F"]);
const validRightSymbols = new Set(["-", "7", "J"]);
const validDownSymbols = new Set(["|", "L", "J"]);
const validLeftSymbols = new Set(["-", "L", "F"]);

symbolRelations.set(
	"S",
	new Map([
		["up", validUpSymbols],
		["right", validRightSymbols],
		["down", validDownSymbols],
		["left", validLeftSymbols],
	])
);
symbolRelations.set(
	"|",
	new Map([
		["up", validUpSymbols],
		["down", validDownSymbols],
	])
);
symbolRelations.set(
	"-",
	new Map([
		["right", validRightSymbols],
		["left", validLeftSymbols],
	])
);
symbolRelations.set(
	"L",
	new Map([
		["up", validUpSymbols],
		["right", validRightSymbols],
	])
);
symbolRelations.set(
	"J",
	new Map([
		["up", validUpSymbols],
		["left", validLeftSymbols],
	])
);
symbolRelations.set(
	"7",
	new Map([
		["down", validDownSymbols],
		["left", validLeftSymbols],
	])
);
symbolRelations.set(
	"F",
	new Map([
		["right", validRightSymbols],
		["down", validDownSymbols],
	])
);

const partOne = (sketch, sCoordinates) => {
	const visitedArray = sketch.map((row) => row.map((symbol) => false));
	let [row, column] = sCoordinates;
	visitedArray[row][column] = true;
	let maxSteps = 0;

	const bfs = (coordinates, visitedArray) => {
		let level = [coordinates];
		let nextLevel = [];

		const directions = [
			{ row: -1, column: 0, orientation: "up" },
			{ row: 0, column: 1, orientation: "right" },
			{ row: 1, column: 0, orientation: "down" },
			{ row: 0, column: -1, orientation: "left" },
		];

		while (level.length) {
			while (level.length) {
				const [row, column] = level.shift();

				for (const direction of directions) {
					const nextRow = row + direction.row;
					const nextColumn = column + direction.column;

					if (
						nextRow >= 0 &&
						nextRow < sketch.length &&
						nextColumn >= 0 &&
						nextColumn < sketch[row].length &&
						!visitedArray[nextRow][nextColumn] &&
						symbolRelations
							.get(sketch[row][column])
							.has(direction.orientation) &&
						symbolRelations
							.get(sketch[row][column])
							.get(direction.orientation)
							.has(sketch[nextRow][nextColumn])
					) {
						visitedArray[nextRow][nextColumn] = true;
						nextLevel.push([nextRow, nextColumn]);
					}
				}
			}

			if (nextLevel.length) {
				maxSteps++;
				level = nextLevel;
				nextLevel = [];
			}
		}

		return maxSteps;
	};

	return bfs(sCoordinates, visitedArray);
};

console.log(partOne(sketch, sCoordinates));
