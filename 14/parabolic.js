import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const platform = fileContent.split("\n");

const platformAsArray = [];

for (const row of platform) {
    platformAsArray.push(row.split(""));
}

const tiltNorth = platformAsArray => {
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
}

const tiltWest = platformAsArray => {
    for (let row = 0; row < platformAsArray.length; row++) {
        let emptySpaceIndex = null;
        let column = 0;

        while (column < platformAsArray[row].length) {
            if (platformAsArray[row][column] === "." && emptySpaceIndex === null) {
                emptySpaceIndex = column;
                column++;
            }
            else if (platformAsArray[row][column] === "O" && Number.isInteger(emptySpaceIndex)) {
                [platformAsArray[row][column], platformAsArray[row][emptySpaceIndex]] = [platformAsArray[row][emptySpaceIndex], platformAsArray[row][column]];

                column = emptySpaceIndex + 1;
                emptySpaceIndex = null;
            }
            else if (platformAsArray[row][column] === "#") {
                emptySpaceIndex = null;
                column++;
            }
            else {
                column++;
            }
        }

    }
}

const tiltSouth = platformAsArray => {
    for (let column = 0; column < platformAsArray[0].length; column++) {
        let emptySpaceIndex = null;
        let row = platformAsArray.length - 1;

        while (row >= 0) {
            if (platformAsArray[row][column] === "." && emptySpaceIndex === null) {
                emptySpaceIndex = row;
                row--;
            }
            else if (platformAsArray[row][column] === "O" && Number.isInteger(emptySpaceIndex)) {
                [platformAsArray[row][column], platformAsArray[emptySpaceIndex][column]] = [platformAsArray[emptySpaceIndex][column], platformAsArray[row][column]];

                row = emptySpaceIndex - 1;
                emptySpaceIndex = null;
            }
            else if (platformAsArray[row][column] === "#") {
                emptySpaceIndex = null;
                row--;
            }
            else {
                row--;
            }
        }
    }
}

const tiltEast = platformAsArray => {
    for (let row = 0; row < platformAsArray.length; row++) {
        let emptySpaceIndex = null;
        let column = platformAsArray[row].length;

        while (column >= 0) {
            if (platformAsArray[row][column] === "." && emptySpaceIndex === null) {
                emptySpaceIndex = column;
                column--;
            }
            else if (platformAsArray[row][column] === "O" && Number.isInteger(emptySpaceIndex)) {
                [platformAsArray[row][column], platformAsArray[row][emptySpaceIndex]] = [platformAsArray[row][emptySpaceIndex], platformAsArray[row][column]];

                column = emptySpaceIndex - 1;
                emptySpaceIndex = null;
            }
            else if (platformAsArray[row][column] === "#") {
                emptySpaceIndex = null;
                column--;
            }
            else {
                column--;
            }
        }

    }
}

const partOne = platformAsArray => {
    tiltNorth(platformAsArray);

    let sum = 0;

    for (let i = 0; i < platformAsArray.length; i++) {
        sum += platformAsArray[i].filter(value => value === "O").length * (platformAsArray.length - i);
    }

    return sum;
}

const partTwo = platformAsArray => {
    const map = new Map();

    for (let i = 0; i < 1000; i++) {
        tiltNorth(platformAsArray);
        tiltWest(platformAsArray);
        tiltSouth(platformAsArray);
        tiltEast(platformAsArray);

        let s = platformAsArray.reduce((string, row) => string + row.join(""), "");

        let sum = 0;

        for (let j = 0; j < platformAsArray.length; j++) {
            sum += platformAsArray[j].filter(value => value === "O").length * (platformAsArray.length - j);
        }

        let index = i;

        if (i >= 82) {
            index = ((i - 82) % 77) + 82
        }

        if (!map.has(s)) {
            map.set(s, [index]);
        }
        else {
            const indices = map.get(s);
            indices.push(index);
            map.set(s, indices);
        }

        if (index === 152) {
            let sum = 0;

            for (let j = 0; j < platformAsArray.length; j++) {
                sum += platformAsArray[j].filter(value => value === "O").length * (platformAsArray.length - j);
            }
            return sum;
        }
    }
}

console.log(partTwo(platformAsArray))