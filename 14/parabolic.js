import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const platform = fileContent.split("\n");

const platformAsArray = [];

for (const row of platform) {
    platformAsArray.push(row.split(""));
}

const partOne = platformAsArray => {
    for (let column = 0; column < platformAsArray[0].length; column++) {
        let emptySpaceIndex = null;
        let row = 0;

        while (row < platformAsArray.length) {
            if (platformAsArray[row][column] === "." && emptySpaceIndex === null) {
                emptySpaceIndex = row;
                row++;
            }
            else if (platformAsArray[row][column] === "O" && Number.isInteger(emptySpaceIndex)) {
                [platformAsArray[row][column], platformAsArray[emptySpaceIndex][column]] = [platformAsArray[emptySpaceIndex][column], platformAsArray[row][column]];

                row = emptySpaceIndex + 1;
                emptySpaceIndex = null;
            }
            else if (platformAsArray[row][column] === "#") {
                emptySpaceIndex = null;
                row++;
            }
            else {
                row++;
            }
        }
    }

    let sum = 0;

    for (let i = 0; i < platformAsArray.length; i++) {
        sum += platformAsArray[i].filter(value => value === "O").length * (platformAsArray.length - i);
    }

    return sum;
}

console.log(partOne(platformAsArray))