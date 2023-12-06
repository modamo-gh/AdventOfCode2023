import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

for (let i = 0; i < lines.length; i++) {
	{
		lines[i] = lines[i].split(": ")[1].trim().split(/\s+/);

		for (let j = 0; j < lines[i].length; j++) {
			lines[i][j] = parseInt(lines[i][j]);
		}
	}
}

const partOne = (lines) => {
	let productOfNumberOfWaysToWin = 1;

	for (let i = 0; i < lines[0].length; i++) {
		const roots = getRoots(-1, lines[0][i], -1 * lines[1][i]);
		console.log(roots);
		const numberOfWaysToWin = roots[1] - roots[0] + 1;

		productOfNumberOfWaysToWin *= numberOfWaysToWin;
	}

	console.log(productOfNumberOfWaysToWin);
};

const partTwo = lines => {
    for(let i = 0; i < lines.length; i++){
        lines[i] = parseInt(lines[i].join(""));
    }

    const roots = getRoots(-1, lines[0], -1 * lines[1]);
    const numberOfWaysToWin = roots[1] - roots[0] + 1;
    console.log(numberOfWaysToWin)
}

const getRoots = (a, b, c) => {
	const roots = [];
	let x1 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
	let x2 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);

	if (x1 === Math.ceil(x1)) {
		x1++;
	}

	if (x2 === Math.ceil(x2)) {
		x2--;
	}

	x1 = Math.ceil(x1);
	x2 = Math.floor(x2);

	roots.push(x1);
	roots.push(x2);

	return roots;
};

partTwo(lines);
