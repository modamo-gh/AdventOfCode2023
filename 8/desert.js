import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

const directions = lines[0];

const network = new Map();

for (let line of lines.slice(2)) {
	const [start, left, right] = line
		.split(/\W/)
		.filter((string) => string.match(/\w+/));
	network.set(start, [left, right]);
}

const partOne = (directions, network) => {
	let position = "AAA";
	let numberOfStepsToZZZ = 0;
	let zzzFound = false;
	let directionIndex = 0;

	while (!zzzFound) {
		if (directions[directionIndex] === "L") {
			position = network.get(position)[0];
		} else if (directions[directionIndex] === "R") {
			position = network.get(position)[1];
		}

		numberOfStepsToZZZ++;

		if (position === "ZZZ") {
			zzzFound = true;
		} else {
			directionIndex = (directionIndex + 1) % directions.length;
		}
	}

	return numberOfStepsToZZZ;
};

console.log(partOne(directions, network));
