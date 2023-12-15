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

const partOne = steps => {
    return steps.reduce((sum, step) => sum + hash(step), 0);
}

const partTwo = steps => {
    const boxes = new Map();

    for (const step of steps) {
        const label = step.match(/^[a-z]+/)[0];
        const operator = step.match(/\W/)[0];
        const boxNumber = hash(label);
        const lens = step.split(/\W/).map(value => {
            if (Number.isInteger(parseInt(value))) {
                return parseInt(value);
            }
            else {
                return value;
            }
        });

        if (operator === "-") {
            let lenses = boxes.get(boxNumber);

            if (lenses) {
                const indexOfLens = lenses.findIndex(lens => lens[0] === label);

                if (indexOfLens > -1) {
                    lenses = lenses.slice(0, indexOfLens).concat(lenses.slice(indexOfLens + 1));
                    
                    if(lenses.length){
                        boxes.set(boxNumber, lenses);
                    }
                    else{
                        boxes.delete(boxNumber)
                    }
                }
            }
        }
        else {
            let lenses = boxes.get(boxNumber);

            if (lenses) {
                const indexOfLens = lenses.findIndex(lens => lens[0] === label);

                if (indexOfLens > -1) {
                    lenses = lenses.slice(0, indexOfLens).concat([lens]).concat(lenses.slice(indexOfLens + 1));
                    boxes.set(boxNumber, lenses);
                }
                else {
                    lenses.push(lens)
                }
            }
            else {
                boxes.set(boxNumber, [lens]);
            }
        }
    }

    let sum = 0;

    for(const [boxNumber, lenses] of boxes){
        for(let lens = 0; lens < lenses.length; lens++){
            sum += (boxNumber + 1) * (lens + 1) * lenses[lens][1];
        }
    }

    return sum;
}

console.log(partTwo(steps))