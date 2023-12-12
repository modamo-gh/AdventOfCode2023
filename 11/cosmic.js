import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let universe = [];

lines.forEach((line) => {
	universe.push(line.split(""));
});

const expandUniverse = (universe) => {
	const rowsToExpand = [];
	const columnsToExpand = [];

	for (let row = 0; row < universe.length; row++) {
		const cosmicElements = new Set(universe[row]);
		if (cosmicElements.size === 1 && cosmicElements.has(".")) {
			rowsToExpand.push(row);
		}
	}

	for (let column = 0; column < universe[0].length; column++) {
		const cosmicElements = new Set();

		for (let row = 0; row < universe.length; row++) {
			cosmicElements.add(universe[row][column]);
		}

		if (cosmicElements.size === 1 && cosmicElements.has(".")) {
			columnsToExpand.push(column);
		}
	}

	for (let i = rowsToExpand.length - 1; i >= 0; i--) {
		const expandedUniverse = universe.slice(0, rowsToExpand[i]);
		expandedUniverse.push(new Array(universe[0].length).fill("."));
		for (const space of universe.slice(rowsToExpand[i])) {
			expandedUniverse.push(space);
		}

		universe = expandedUniverse;
	}

	for (let i = columnsToExpand.length - 1; i >= 0; i--) {
		for (let row = 0; row < universe.length; row++) {
			const expandedRow = universe[row].slice(0, columnsToExpand[i]);
			expandedRow.push(".");
			universe[row] = expandedRow.concat(
				universe[row].slice(columnsToExpand[i])
			);
		}
	}

	return universe;
};

const discoverGalaxies = (universe) => {
	const galaxyLocations = [];

	for (let row = 0; row < universe.length; row++) {
		for (let column = 0; column < universe[row].length; column++) {
			if (universe[row][column] === "#") {
				galaxyLocations.push(row * universe[row].length + column);
			}
		}
	}

	return galaxyLocations;
};

const calculateAllShortestPaths = (galaxyLocations) => {
	const shortestPaths = [];
	const galaxies = [];

	const helper = (index) => {
		if (galaxies.length === 2) {
			const [x, y] = galaxies;
			const rowLength = universe[0].length;

			const rowX = Math.floor(x / rowLength);
			const columnX = x % rowLength;

			const rowY = Math.floor(y / rowLength);
			const columnY = y % rowLength;

			shortestPaths.push(
				Math.abs(rowX - rowY) + Math.abs(columnX - columnY)
			);

			return;
		}

		for (let i = index; i < galaxyLocations.length; i++) {
			galaxies.push(galaxyLocations[i]);
			helper(i + 1);
			galaxies.pop();
		}
	};

	helper(0);

	return shortestPaths;
};

universe = expandUniverse(universe);
const galaxyLocations = discoverGalaxies(universe);

const shortestPaths = calculateAllShortestPaths(galaxyLocations);

console.log(shortestPaths.reduce((sum, pathLengths) => sum + pathLengths, 0));
