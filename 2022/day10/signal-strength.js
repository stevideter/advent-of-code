const fs = require('fs');

let X = 1;
let cycle = 0;
let sum = 0;
function signalStrength(cycle, register) {
    const signal = cycle * register;
    sum += signal;
    return signal;
}
function incrementCycle() {
    cycle++;
    console.log({ cycle, X });
    if (cycle > 0 && (cycle === 20 || (cycle - 20) % 40 === 0)) {
        console.log({ signalStrength: signalStrength(cycle, X) });
    }
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
    input.forEach((instruction) => {
        execute(instruction);
        console.log({ cycle, X });
    });
    console.log({ sum });
});
