import { input } from './input';
import { Day } from '../common.models';
const data = input.split('');

const findDistinctLength = (length: number): number => {
    return data.findIndex((element, index) => {
        if( index < length ) { return false }
        const subarray = data.slice(index - length, index);
        const dataSet = new Set(subarray);
        if(dataSet.size === length) {
            return true;
        }
    });
}

export const day6: Day = {
    answ1: findDistinctLength(4),
    answ2: findDistinctLength(14)
}