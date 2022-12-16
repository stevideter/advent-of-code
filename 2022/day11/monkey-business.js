const fs = require('fs');

const monkeys = [];

const itemsRegex = /  Starting items: (.+)/;
const operationRegex = /  Operation: new = (.+) (.) (.+)/;
const testRegex = /  Test: divisible by (\d+)/;
const resultRegex = /    If (true|false): throw to monkey (\d+)/;
function parseMonkeys(input) {
    // console.log(input);
    const items = input[1]
        .match(itemsRegex)[1]
        .split(', ')
        .map((item) => parseInt(item));
    // console.log(items);
    const operation = input[2].match(operationRegex).slice(1, 4);
    // console.log(operation);
    const test = parseInt(input[3].match(testRegex)[1]);
    // console.log(test);
    const trueResult = parseInt(input[4].match(resultRegex)[2]);
    const falseResult = parseInt(input[5].match(resultRegex)[2]);
    // console.log({ trueResult, falseResult });
    let monkey = {
        items,
        operation,
        test,
        result: {
            true: trueResult,
            false: falseResult,
        },
        inspections: 0,
    };
    monkeys.push(monkey);
}

function increaseWorry(operation, start) {
    let leftHand = operation[0] === 'old' ? start : parseInt(operation[0]);
    let rightHand = operation[2] === 'old' ? start : parseInt(operation[2]);
    let result = 0;
    const op = operation[1];
    switch (operation[1]) {
        case '+':
            result = leftHand + rightHand;
            console.log(
                `    Worry level is increase by ${rightHand} to ${result}.`
            );
            break;
        case '-':
            result = leftHand - rightHand;
            console.log(
                `    Worry level is reduced by ${rightHand} to ${result}.`
            );
            break;
        case '*':
            result = leftHand * rightHand;
            console.log(
                `    Worry level is multiplied by ${rightHand} to ${result}.`
            );
            break;
        case '/':
            result = leftHand / rightHand;
            console.log(
                `    Worry level is divided by ${rightHand} to ${result}.`
            );
            break;
        default:
            throw new Error(`unhandled operation ${operation[1]}`);
    }
    return result;
}
function decreaseWorry(newWorry) {
    const result = parseInt(newWorry / 3);
    console.log(
        `    Monkey gets bored with item. Worry level is divided by 3 to ${result}.`
    );
    return result;
}
function monkeyTest(value, test, result) {
    const isDivisible = value % test === 0;
    let nextMonkey;
    if (isDivisible) {
        console.log(`    Current worry level is divisible by ${test}.`);
        nextMonkey = result.true;
    } else {
        console.log(`    Current worry level is not divisible by ${test}.`);
        nextMonkey = result.false;
    }
    console.log(
        `    Item with worry level ${value} is thrown to monkey ${nextMonkey}.`
    );
    monkeys[nextMonkey].items.push(value);
}

function monkeyRound() {
    monkeys.forEach((monkey, monkeyIndex) => {
        console.log(`Monkey ${monkeyIndex}:`);
        const { items, operation, test, result } = monkey;
        const itemCount = items.length;
        for (let i = 0; i < itemCount; i++) {
            const item = items.shift();
            console.log(
                `  Monkey inspects an item with a worry level of ${item}.`
            );
            const newWorry = increaseWorry(operation, item);
            monkey.inspections++;
            const reduced = decreaseWorry(newWorry);
            monkeyTest(reduced, test, result);
        }
    });
}

fs.readFile(`${__dirname}/monkeys.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    for (let monkey = 0; monkey < input.length; monkey += 7) {
        const aMonkey = input.slice(monkey, monkey + 6);
        parseMonkeys(aMonkey);
    }
    const roundsToPlay = 20;
    for (let r = 0; r < roundsToPlay; r++) {
        monkeyRound();
    }
    monkeys.sort((a, b) => b.inspections - a.inspections);
    const monkeyBusiness = monkeys[0].inspections * monkeys[1].inspections;
    console.log({ monkeyBusiness });
});
