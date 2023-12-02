import fs from "fs";

const filePath = "./puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let sumOfPowers = 0;

for (let line of lines) {
	const indexOfColon = line.indexOf(":");
	line = line.substring(indexOfColon + 1);

	const reveals = line.split(";");
	const minimumRGBs = [0, 0, 0];

	for (const reveal of reveals) {
		const quantityColorPairs = reveal.split(",");

		for (let i = 0; i < quantityColorPairs.length; i++) {
			quantityColorPairs[i] = quantityColorPairs[i].trim();
		}

		for (const quantityColorPair of quantityColorPairs) {
			const quantityColor = quantityColorPair.split(" ");
			const quantity = quantityColor[0];
			const color = quantityColor[1];

			if (color === "red") {
				minimumRGBs[0] = Math.max(quantity, minimumRGBs[0]);
			} else if (color === "green") {
				minimumRGBs[1] = Math.max(quantity, minimumRGBs[1]);
			} else {
				minimumRGBs[2] = Math.max(quantity, minimumRGBs[2]);
			}
		}
	}

	const power = minimumRGBs.reduce((accumulator, currentValue) => accumulator * currentValue, 1);

    sumOfPowers += power;
}

console.log(sumOfPowers);