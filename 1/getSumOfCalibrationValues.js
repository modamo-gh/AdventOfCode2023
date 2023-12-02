import fs from "fs";
import readLineSync from "readline-sync";

const filePath = "./puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let sumOfCalibrationValues = 0;

const wordsToDigits = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const getFirstDigit = line => {
    let indexOfFirstNumericalDigit = Infinity;

    for (let i = 0; i < line.length; i++) {
		if (parseInt(line[i])) {
			indexOfFirstNumericalDigit = i;
            break;
		}
	}

    let indexOfFirstWordDigit = Infinity;
    let firstWord;

    for(const word in wordsToDigits){
        const indexOfWord = line.indexOf(word);

        if(indexOfWord > -1){
            if(indexOfWord < indexOfFirstWordDigit){
                indexOfFirstWordDigit = indexOfWord;
                firstWord = word;
            }
        }
    }

    return indexOfFirstNumericalDigit < indexOfFirstWordDigit ? parseInt(line[indexOfFirstNumericalDigit]) : wordsToDigits[firstWord];
}

const getLastDigit = line => {
    let indexOfLastNumericalDigit = -Infinity;

    for (let i = line.length - 1; i >= 0; i--) {
		if (parseInt(line[i])) {
			indexOfLastNumericalDigit = i;
			break;
		}
	}

    let indexOfLastWordDigit = -Infinity;
    let lastWord;

    for(const word in wordsToDigits){
        const indexOfWord = line.lastIndexOf(word);

        if(indexOfWord > -1){
            if(indexOfWord > indexOfLastWordDigit){
                indexOfLastWordDigit = indexOfWord;
                lastWord = word;
            }
        }
    }

    return indexOfLastNumericalDigit > indexOfLastWordDigit ? parseInt(line[indexOfLastNumericalDigit]) : wordsToDigits[lastWord];
}

for (const line of lines) {
	let calibrationValue = 0;

	calibrationValue += getFirstDigit(line) * 10;

	calibrationValue += getLastDigit(line);

	sumOfCalibrationValues += calibrationValue;
}



console.log(sumOfCalibrationValues);
