import { input } from './input';

const scores: {[key: string]: number} = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
}

const secondPartScore: {[key: string]: number} = {
    X: 0,
    Y: 3,
    Z: 6,
}

const fightResult: {[key: string]: number} = {
    '-2': 6,
    '-1': 0,
    '0': 3,
    '1': 6,
    '2': 0,
}

const demo = `A Y
B X
C Z`

const rounds = input.split(/\r?\n/);
const answ1 = rounds.reduce((acc, round) => {
    const arr = round.split(' ');
    acc += fightResult[scores[arr[1]] - scores[arr[0]]] + scores[arr[1]];
    return acc;
}, 0);

const chooseMyDecision = (result: number, oppDecision: number): number => {
    switch (result) {
        case 6:
            return oppDecision + 1 === 4 ? 1 : oppDecision + 1;
        case 3:
            return oppDecision;
        case 0:
            return  oppDecision - 1 === 0 ? 3 : oppDecision - 1;
        default:
            return 0;
    }
}

const answ2 = rounds.reduce((acc, round) => {
    const arr = round.split(' ');
    const result = secondPartScore[arr[1]];

    const oppDecision = scores[arr[0]];
    let myDecision: number = chooseMyDecision(result, oppDecision);

    console.log(result, oppDecision, myDecision);
    return acc + myDecision + result;
}, 0);

export const day2 = {
    answ1,
    answ2,
}