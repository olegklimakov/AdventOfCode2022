import { defaultState, demoDefaultState, demoInstructionsRaw, instructionsRaw } from './input';
import { Day } from '../common.models';

const data = defaultState.split(/\r?\n/);
const instructions = instructionsRaw.split(/\r?\n/);

const arrays: string[][] = new Array(9).fill(null).map(() => []);
const arrays2: string[][] = new Array(9).fill(null).map(() => []);

const generateArrays = (rows: string[], array: string[][]) => {
    rows.forEach(row => {
        row.split('').forEach((symb, index) => {
            if(symb === '[') {
                const arrayIndex = index / 4;
                array[arrayIndex].push(row[index+1])
            }
        })
    })
}

const handleInstructions = (instructions: string[], resultArray: string[][], reverse = true) => {
    instructions.forEach((instruction => {
        const numbers = instruction.split(' ');

        if(numbers && numbers.length) {
            const amount: number = Number(numbers[1]);
            const from: number = Number(numbers[3]);
            const to: number = Number(numbers[5]);


            const movingBlocks = resultArray[from - 1].splice(0, amount);
            if(reverse) {
                movingBlocks.reverse();
            }

            resultArray[to - 1] = [...movingBlocks, ...resultArray[to - 1]];
        }
    }))
}

const getFinalRow = (arrays: string[][]) => {
    return arrays.reduce((acc, item) => acc+=item[0], '')
}


generateArrays(data, arrays);
generateArrays(data, arrays2);
handleInstructions(instructions, arrays);
handleInstructions(instructions, arrays2, false);

export const day5: Day = {
    answ1: getFinalRow(arrays),
    answ2: getFinalRow(arrays2)
}
