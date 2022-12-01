"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day1 = void 0;
const input_1 = require("./input");
const data = input_1.input
    .split(/\n\s*\n/)
    .map(elf => elf.split(/\r?\n/).map(strings => Number(strings)))
    .map(elf => elf.reduce((acc, item) => { acc += item; return acc; }));
const answ1 = Math.max(...data);
const answ2 = [...data].sort((a, b) => b - a).slice(0, 3).reduce((acc, item) => { acc += item; return acc; });
exports.day1 = {
    answ1,
    answ2,
};
