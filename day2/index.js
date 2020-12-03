// Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

// Given the same example list from above:

// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

const fs = require('fs');
const { exit } = require('process');
function validateRule(entry) {
    const values = entry.split(' ');
    const positions = values[0].split('-');
    const key = values[1].slice(0, -1);
    const password = values[2];
    const indexA = Number.parseInt(positions[0], 10) - 1;
    const indexB = Number.parseInt(positions[1], 10) - 1
    const charA = password[indexA];
    const charB = password[indexB];
    const result = (charA === key ^ charB === key);
    console.log(password, key, indexA, indexB, charA, charB, result);
    return result;
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        exit(1);
    }
    const entries = data.split('\n');
    let validEntries = 0;
    entries.forEach((entry) => {
        if (validateRule(entry)) {
            validEntries += 1;
        }
    });
    console.log('found', validEntries);
});

