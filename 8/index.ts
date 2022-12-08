import { demoData, input } from './input';
import { Day } from '../common.models';

const data = input.split(/\r?\n/).map(row => {
    return row.split('').map(item => Number(item))
});

const isVisible = (arr: number[], item: number) => {
    return arr.every(element => element < item)
}

interface calculateVisibilityScoreParams {
    top: number[];
    left: number[];
    right: number[];
    bottom: number[];
    item: number;
}

const findIndexOfHighest = (arr: number[], item: number): number => {
    const index = arr.findIndex(element => {
        return element >= item
    });
    return index == -1 ? arr.length : index + 1;
}

const calculateVisibility = ({ left, top, right, bottom, item }: calculateVisibilityScoreParams): number => {
    return findIndexOfHighest(left.reverse(), item)
        * findIndexOfHighest(right, item)
        * findIndexOfHighest(top.reverse(), item)
        * findIndexOfHighest(bottom, item)
}

const calculateResult = (data: number[][]): { numberOfVisible: number, highestScore: number } => {
    let numberOfVisible: number = 0;
    let highestScore: number = 0;
    data.forEach((row, rowIndex) => {
        row.forEach((item, colIndex) => {
            const isEdge = rowIndex === 0 || rowIndex === data.length - 1 || colIndex === 0 || colIndex === row.length - 1

            if(isEdge) {
                numberOfVisible += 1;
                return;
            }

            const left = row.slice(0, colIndex);
            const right = row.slice(colIndex + 1, row.length);
            const top = data.map(x => x[colIndex]).slice(0, rowIndex);
            const bottom = data.map(x => x[colIndex]).slice(rowIndex + 1, data.length);

            const score = calculateVisibility({ left, right, top, bottom, item });
            highestScore = score > highestScore ? score : highestScore;

            const leftArrayVisible = isVisible(left, item);
            const rightArrayVisible = isVisible(right, item);
            const topArrayVisible = isVisible(top, item);
            const bottomArrayVisible = isVisible(bottom, item);

            if(leftArrayVisible || rightArrayVisible || topArrayVisible || bottomArrayVisible) {
                numberOfVisible += 1;
                return;
            }
        })
    });

    return {
        numberOfVisible,
        highestScore,
    };
}

const res = calculateResult(data);

export const day8: Day = {
    answ1: res.numberOfVisible,
    answ2: res.highestScore,
}