import fs from "fs";

const filePath = "./inputs/puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const initializationSequence = fileContent.split("\n");

const steps = initializationSequence[0].split(",").map(step => step.trim());

const hash = step => {
    let currentValue = 0;

    for (let i = 0; i < step.length; i++) {
        currentValue += step.charCodeAt(i);
        currentValue *= 17;
        currentValue %= 256;
    }

    return currentValue;
}

console.log(steps.reduce((sum, step) => sum + hash(step), 0));