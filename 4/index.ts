import { demo, input } from './input';
import { Day } from '../common.models';

interface RangeItem {
    left: number;
    right: number;
}

interface CompareItem {
    first: RangeItem,
    second: RangeItem,
}

const data = input.split(/\r?\n/);

const handleRangeElement = (item: string): RangeItem => {
    const range = item.split('-');
    return {
        left: Number(range[0]),
        right: Number(range[1]),
    }
}

const rangeData: CompareItem[] = data.map(row => {
    const pair = row.split(',');
    return {
        first: handleRangeElement(pair[0]),
        second: handleRangeElement(pair[1]),
    }
})

const isInclude = (first: RangeItem, second: RangeItem): boolean => {
    return first.left >= second.left && first.right <= second.right;
}

const isOverlap = (first: RangeItem, second: RangeItem): boolean => {
    return second.left >= first.left && second.left <= first.right;
}

const intersectsElements = rangeData.reduce((acc, item) => {
    if(isInclude(item.first, item.second) || isInclude(item.second, item.first)) {
        acc += 1;
    }
    return acc;
}, 0);

const overlappingElements = rangeData.reduce((acc, item) => {
    if(isOverlap(item.first, item.second) || isOverlap(item.second, item.first)) {
        acc += 1;
    }
    return acc;
}, 0);

export const day4: Day = {
    answ1: intersectsElements,
    answ2: overlappingElements,
}