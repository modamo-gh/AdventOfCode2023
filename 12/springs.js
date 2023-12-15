import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const conditionRecord = fileContent.split("\n");

const getNumberOfValidArrangements = (springs, groupSizes) => {
    const springStates = [".", "#"];
    let numberOfValidArrangements = 0;
    const arrangements = new Set();

    const helper = (index, springs) => {
        springs = [...springs];

        if (!springs.includes("?")) {
            const arrangement = springs.join("");
            arrangements.add(arrangement);

            return;
        }

        for (let i = index; i < springs.length; i++) {
            if (springs[i] === "?") {
                for (const state of springStates) {
                    const springsCopy = [...springs];
                    springsCopy[i] = state;
                    helper(i + 1, springsCopy);
                }
            }
        }
    }

    helper(0, springs);

    let foundValidArrangement = false;

    for (let arrangement of arrangements) {
        arrangement = arrangement.split(/\.+/).filter(group => group.length);

        for (let i = 0; i < groupSizes.length; i++) {
            if (!arrangement[i] || arrangement[i].length !== groupSizes[i] || arrangement.length !== groupSizes.length) {
                foundValidArrangement = false;
                break;
            }

            foundValidArrangement = true;
        }

        if (foundValidArrangement) {
            numberOfValidArrangements++;
        }
    }


    return numberOfValidArrangements;
}

let sum = 0;
for (const row of conditionRecord) {
    let [springs, groupSizes] = row.split(" ");
    springs = springs.split("");
    groupSizes = groupSizes.split(",").map(size => parseInt(size));

    const numberOfValidArrangements = getNumberOfValidArrangements(springs, groupSizes);

    sum += numberOfValidArrangements;
}

console.log(sum)