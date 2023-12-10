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

const partTwo = (cards) => {
	const scratchcards = new Map();

	for (let cardNumber = 0; cardNumber < cards.length; cardNumber++) {
		cards[cardNumber] = cards[cardNumber].split(": ")[1];

		let [winningNumbers, myNumbers] = cards[cardNumber].split("|");

		winningNumbers = winningNumbers.trim();
		winningNumbers = new Set(winningNumbers.split(" "));
		myNumbers = myNumbers.trim().split(/\s+/);

		scratchcards.set(cardNumber + 1, [winningNumbers, myNumbers]);
	}

	const scratchcardsIOwn = new Array([...scratchcards.keys()].length).fill(1);

	for (let i = 0; i < scratchcardsIOwn.length; i++) {
		let numberOfMatches = 0;

		for (const number of scratchcards.get(i + 1)[1]) {
			if (scratchcards.get(i + 1)[0].has(number)) {
				numberOfMatches++;
			}
		}

		for(let j = 1; j <= numberOfMatches; j++){
            scratchcardsIOwn[i + j] += scratchcardsIOwn[i];
        }
	}

	console.log(scratchcardsIOwn.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
};

partTwo(lines);