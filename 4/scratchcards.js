import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

const partOne = (cards) => {
	let sumOfCardValues = 0;

	for (let card of cards) {
		let cardValue = 0.5;

		card = card.split(": ")[1];

		let [winningNumbers, myNumbers] = card.split("|");

		winningNumbers = winningNumbers.trim();
		winningNumbers = new Set(winningNumbers.split(" "));
		myNumbers = myNumbers.trim().split(/\s+/);

		for (const number of myNumbers) {
			if (winningNumbers.has(number)) {
				cardValue *= 2;
			}
		}

		sumOfCardValues += Math.floor(cardValue);
	}

	console.log(sumOfCardValues);
};