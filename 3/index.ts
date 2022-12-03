import { input } from './input';

const demo = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const data = input.split(/\r?\n/);

const isUpperCase = (data: string) => /^[A-Z]*$/.test(data)

const getPriority = (element: string): number => {
    const isUpper = isUpperCase(element);
    if(isUpper) {
        return element.toLowerCase().charCodeAt(0) - 96 + 26
    }
    return element.charCodeAt(0) - 96
}

const answ1 = data.reduce((acc, rucksack: string) => {
    let priority = 0;
    const halfIndex = rucksack.length / 2;
    const firstHalf = rucksack.slice(0, halfIndex).split('');
    const secondHalf = rucksack.slice(halfIndex, rucksack.length).split('');
    const unique = firstHalf.filter(item => secondHalf.includes(item));
    if(unique.length) {
        priority = getPriority(unique[0]);
    }
    return acc += priority;
}, 0);

interface Task2 {
    total: number;
    array: string[][];
}

const task2 = data.reduce((acc, rucksack: string, index) => {
    acc.array.push(rucksack.split(''));

    if(acc.array.length === 3) {
        const unique = acc.array[0].filter(item => acc.array[1].includes(item) && acc.array[2].includes(item));
        acc.total += getPriority(unique[0]);
        acc.array = [];
    }
    return acc;
}, {
    total: 0,
    array: [],
} as Task2);

const answ2 = task2.total;

export const day3 = {
    answ1,
    answ2,
}