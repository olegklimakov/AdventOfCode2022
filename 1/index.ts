import { input } from "./input";

const data = input
.split(/\n\s*\n/)
.map(elf => elf.split(/\r?\n/).map(strings => Number(strings)))
.map(elf => elf.reduce((acc,item) => { acc+=item; return acc }))

const answ1 = Math.max(...data);
const answ2 = [...data].sort((a,b) => b - a).slice(0, 3).reduce((acc, item) => { acc += item; return acc });

export const day1 = {
    answ1,
    answ2,
}
