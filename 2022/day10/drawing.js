const fs = require('fs');

let X = 1;
let cycle = 0;
const CPU = [];
const width = 40;
const height = 6;
const spritePixel = '#';
function initializeCPU() {
    for (let y = 0; y < height; y++) {
        CPU.push(Array(width).fill('.'));
    }
}
function printCPU() {
    CPU.forEach((row) => {
        console.log(row.join(''));
    });
}
function drawPixel() {
    const drawingRow = parseInt((cycle - 1) / width);
    const currentRow = CPU[drawingRow];
    const currentIndex = cycle - 1 - drawingRow * width;
    if (currentIndex >= X - 1 && currentIndex <= X + 1) {
        currentRow[currentIndex] = spritePixel;
    }
}

function incrementCycle() {
    cycle++;
    drawPixel();
}

function execute(instruction) {
    incrementCycle();
    if (instruction === 'noop') {
        return;
    }
    incrementCycle();
    const data = instruction.split(' ');
    X = X + parseInt(data[1]);
}

fs.readFile(`${__dirname}/program.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    initializeCPU();
    input.forEach((instruction) => {
        execute(instruction);
    });
    printCPU();
});
