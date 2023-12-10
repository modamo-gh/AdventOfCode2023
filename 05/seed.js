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

const partTwo = (groups) => {
	const seedsAndMaps = [];

	for (let group of groups) {
		group = group.split(":")[1].trim().split("\n");

		seedsAndMaps.push(group);
	}

	seedsAndMaps.reverse();

	const initialSeeds = seedsAndMaps[seedsAndMaps.length - 1][0].split(/\s+/);

	for (let i = 0; i < initialSeeds.length; i++) {
		initialSeeds[i] = parseInt(initialSeeds[i]);
	}

	const initialSeedRanges = [];

	for (let i = 0; i < initialSeeds.length; i += 2) {
		const range = [initialSeeds[i]];

		if (i + 1 < initialSeeds.length) {
			range.push(initialSeeds[i + 1]);
		}

		initialSeedRanges.push(range);
	}

	const maps = seedsAndMaps.slice(0, seedsAndMaps.length - 1);

	for (const map of maps) {
		for (let i = 0; i < map.length; i++) {
			map[i] = map[i].split(/\s+/);

			for (let j = 0; j < map[i].length; j++) {
				map[i][j] = parseInt(map[i][j]);
			}
		}

		map.sort((a, b) => a[0] - b[0]);
	}

	let startingValue = 0;
	let continueOuterLoop = true;

	while (continueOuterLoop) {
		let value = startingValue;
		console.log(value);
		
		for (let i = 0; i < maps.length; i++) {
			value = getConvertedValue(value, maps[i]);	
		}

		for (const [start, length] of initialSeedRanges) {
			if (value >= start && value < start + length) {
				console.log(startingValue);
				continueOuterLoop = false;
				break;
			}
		}

		startingValue++;
	}
};

const getConvertedValue = (initialValue, map) => {
	for (const [sourceRangeStart, destinationRangeStart, rangeLength] of map) {
		if (
			initialValue >= sourceRangeStart && initialValue < sourceRangeStart + rangeLength
		) {
			return initialValue - sourceRangeStart + destinationRangeStart;
		}
	}

	return initialValue;
};

partOne(groups);
