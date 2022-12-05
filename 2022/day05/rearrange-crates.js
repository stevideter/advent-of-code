const fs = require('fs');

const movementRegex = /move (\d+) from (\d+) to (\d+)/;

function setUpPiles(crateInput, rows) {
    // going backwards, build up each stack
    const stacks = [];
    for (let i = 0; i < rows; i++) {
        stacks.push([]);
    }
    for (let i = crateInput.length - 1; i >= 0; i--) {
        const level = crateInput[i];
        // console.log(level);
        for (let m = 0, r = 0; m < level.length; m += 4, r++) {
            const aCrate = level.slice(m, m + 3);
            if (aCrate !== '   ') {
                stacks[r].push(aCrate.replace('[', '').replace(']', ''));
            }
        }
    }
    // console.log(stacks);
    return stacks;
}
function processOrders(crates, orders) {
    console.log(crates);
    orders.forEach((order, index) => {
        const match = order.match(movementRegex);
        if (!match) {
            console.log(`Order ${index} no match `);
        } else {
            const moveNumber = match[1];
            const moveFrom = match[2];
            const moveTo = match[3];
            console.log(`move ${moveNumber} from ${moveFrom} to ${moveTo}`);
            for (let move = 0; move < moveNumber; move++) {
                const crateToMove = crates[moveFrom - 1].pop();
                if (crateToMove) {
                    crates[moveTo - 1].push(crateToMove);
                    console.log(
                        `Order ${index}: Moved ${crateToMove} from ${moveFrom} to ${moveTo}`
                    );
                } else {
                    console.log(
                        `order: ${index} No crate to move from ${moveFrom} to ${moveTo}`
                    );
                }
            }
            console.log(crates);
        }
    });
    return crates;
}
function returnTopCrates(processed) {
    const result = processed.reduce(
        (accumulator, currentValue) => (accumulator += currentValue.pop()),
        ''
    );
    return result;
}

fs.readFile('./crate-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    // process crates and orders
    const crateInput = [];
    let rowCount = 0;
    const orders = [];
    input.forEach((row) => {
        if (row === '') {
            rowCount = crateInput
                .pop()
                .split(' ')
                .filter((value) => {
                    if (value) {
                        return parseInt(value);
                    }
                })
                .pop();
        } else if (row.startsWith('move')) {
            orders.push(row);
        } else {
            crateInput.push(row);
        }
    });
    const crates = setUpPiles(crateInput, rowCount);
    const processed = processOrders(crates, orders);
    const result = returnTopCrates(processed);
    console.log(result);
});
