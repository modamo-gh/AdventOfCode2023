import fs from "fs";
import readLineSync from "readline-sync";

const filePath = "./puzzleInput.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");
const lines = fileContent.split("\n");

let sumOfCalibrationValues = 0;

for(const line of lines){
    let calibrationValue = 0;

    for(let i = 0; i < line.length; i++){
        if(parseInt(line[i])){
            calibrationValue += parseInt(line[i]) * 10;
            break;
        }
    }

    for(let i = line.length - 1; i >= 0; i--){
        if(parseInt(line[i])){
            calibrationValue += parseInt(line[i]);
            break;
        }
    }

    sumOfCalibrationValues += calibrationValue;
}

console.log(sumOfCalibrationValues);