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

const partTwo = (directions, network) => {
	let positions = [...network.keys()].filter((node) => node[2] === "A");
	const stepsToZNodes = positions.map((position) => {
		let stepsToZNode = 0;
		let endsInZ = false;
		let directionIndex = 0;

		while (!endsInZ) {
			if (directions[directionIndex] === "L") {
				position = network.get(position)[0];
			} else if (directions[directionIndex] === "R") {
				position = network.get(position)[1];
			}

			stepsToZNode++;

			if (position[2] === "Z") {
				endsInZ = true;
			} else {
				directionIndex = (directionIndex + 1) % directions.length;
			}
		}

		return stepsToZNode;
	});

	const lcm = calculateLCM(stepsToZNodes);

	return lcm;
};

const calculateLCM = (integers) => {
	const primeFactorizations = integers.map((integer) => {
		const primeFactorization = (integer) => {
			for (let i = 2; i < Math.sqrt(integer); i++) {
				if (integer % i === 0) {
					return [
						primeFactorization(i),
						primeFactorization(integer / i),
					].flat();
				}
			}

			return [integer];
		};

		return primeFactorization(integer);
	});

	const lcm_Factors = [];

	for (const primeFactorization of primeFactorizations) {
		for (const primeFactor of primeFactorization) {
			if (!lcm_Factors.includes(primeFactor)) {
				lcm_Factors.push(primeFactor);
			}
		}
	}

	return lcm_Factors.reduce((product, factor) => product * factor, 1);
};

console.log(partTwo(directions, network));
