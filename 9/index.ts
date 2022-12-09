import { demo, demo2, input } from './input';
import { Day } from '../common.models';

const data = input.split(/\r?\n/);

class Step {
    constructor(public x: number, public y: number) {}
}

let headPath = [new Step(0,0)];

const calculateHeadPath = (data: string[]): Step[] => data.reduce((acc: Step[], item: string, index: number) => {
    const lastStep: Step = acc[acc.length - 1];
    const instruction = item.split(' ');
    const direction = instruction[0];
    const steps = Number(instruction[1]);

    if(direction && steps) {
        const array = new Array(steps).fill(null).map((_, index) => {
            switch (direction) {
                case 'R':
                    return new Step(lastStep.x + 1 + index, lastStep.y);
                case 'L':
                    return new Step(lastStep.x - 1 - index, lastStep.y);
                case 'U':
                    return new Step(lastStep.x, lastStep.y + 1 + index);
                case 'D':
                    return new Step(lastStep.x, lastStep.y - 1 - index);
            }
        });

        return [...acc, ...array] as Step[];
    }
    return acc as Step[];
}, headPath);

const getValue = (diff: number) => {
    return diff > 0 ? 1 : -1;
}

const calculateTailPath = (headPath: Step[]) => {
    let previousStep: Step;

    return headPath.map(item => {
        if(!previousStep) {
            previousStep = item;
            return item;
        } else {
            const newStep = new Step(previousStep.x, previousStep.y);
            const diffX = item.x - previousStep.x;
            const diffY = item.y - previousStep.y;

            const distanceX = Math.abs(diffX);
            const distanceY = Math.abs(diffY);

            if(distanceX + distanceY > 2) {
                newStep.x += getValue(diffX);
                newStep.y += getValue(diffY);
            } else if(distanceY > 1) {
                newStep.y += getValue(diffY);
            } else if(distanceX > 1) {
                newStep.x += getValue(diffX);
            }

            previousStep = new Step(newStep.x, newStep.y);
            return newStep;
        }
    })
}

headPath = calculateHeadPath(data);

const calculateKnotsPath = (length: number, headPath: Step[]) => {
    return new Array(length).fill(null).reduce((acc: Step[]) => {
        return calculateTailPath(acc);
    }, headPath)
}

const tailPath = calculateTailPath(headPath);
const uniqueSteps = new Set(tailPath.map(item => `${item.x}:${item.y}`)).size;
const tail9Path = calculateKnotsPath(9, headPath);
const uniqueSteps9 = new Set(tail9Path.map(item => `${item.x}:${item.y}`)).size;

export const day9: Day = {
    answ1: uniqueSteps,
    answ2: uniqueSteps9,
}