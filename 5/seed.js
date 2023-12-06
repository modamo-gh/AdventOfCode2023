import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const groups = fileContent.split("\n\n");

const partOne = (groups) => {
	const seedsAndMaps = [];

	for (let group of groups) {
		group = group.split(":")[1].trim().split("\n");

		seedsAndMaps.push(group);
	}

	const seeds = seedsAndMaps[0][0].split(/\s+/);
	const maps = seedsAndMaps.slice(1);

	for (const map of maps) {
		for (let i = 0; i < map.length; i++) {
			map[i] = map[i].split(/\s+/);

			for (let j = 0; j < map[i].length; j++) {
				map[i][j] = parseInt(map[i][j]);
			}
		}
	}

	let lowestLocationValue = Infinity;

	for (const seed of seeds) {
		let value = seed;

		for (const map of maps) {
			let potentialValue = value;

			for (const [
				destinationRangeStart,
				sourceRangeStart,
				rangeLength,
			] of map) {
				if (value >= sourceRangeStart) {
					const difference = value - sourceRangeStart;

					if (difference < rangeLength) {
						potentialValue = destinationRangeStart + difference;
						break;
					}
				}
			}

			value = potentialValue;
		}
		console.log(value);

		lowestLocationValue = Math.min(value, lowestLocationValue);
	}

	console.log("\n" + lowestLocationValue);
};

partOne(groups);
