import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

for (let i = 0; i < lines.length; i++) {
	{
		lines[i] = lines[i].split(/\s+/);
	}
}

const partOne = (lines) => {
	const players = [];

	for (const [hand, bid] of lines) {
		players.push({
			hand: hand,
			bid: parseInt(bid),
			strength: calculateStrength(hand),
		});
	}

	players.sort((a, b) => {
		if (a.strength !== b.strength) {
			return a.strength - b.strength;
		} else {
			const cardValues = {
				A: 14,
				K: 13,
				Q: 12,
				J: 11,
				T: 10,
				9: 9,
				8: 8,
				7: 7,
				6: 6,
				5: 5,
				4: 4,
				3: 3,
				2: 2,
			};

			for (let i = 0; i < a.hand.length; i++) {
				if (a.hand[i] !== b.hand[i]) {
					return cardValues[a.hand[i]] - cardValues[b.hand[i]];
				}
			}
		}
	});

	const totalWinnings = players.reduce(
		(accumulator, current, index) =>
			accumulator + current.bid * (index + 1),
		0
	);

	return totalWinnings;
};

const calculateStrength = (hand) => {
	const cardFrequencies = new Map();

	for (const card of hand) {
		const frequency = cardFrequencies.get(card) || 0;

		cardFrequencies.set(card, frequency + 1);
	}

	const frequencies = new Set(cardFrequencies.values());

	if (cardFrequencies.size === 1) {
		return 7;
	} else if (cardFrequencies.size === 2) {
		if (frequencies.has(1)) {
			return 6;
		} else {
			return 5;
		}
	} else if (cardFrequencies.size === 3) {
		if (frequencies.has(3)) {
			return 4;
		} else {
			return 3;
		}
	} else if (cardFrequencies.size === 4) {
		return 2;
	} else {
		return 1;
	}
};

console.log(partOne(lines));
