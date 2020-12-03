// Find the three entries that sum to 2020; what do you get if you multiply them together?
const fs = require('fs');
const { exit } = require('process');
function validateRule(entry) {
    const values = entry.split(' ');
    const range = values[0].split('-');
    const key = values[1].slice(0, -1);
    const password = values[2];
    // console.log(JSON.stringify({ range, key, password}));
    const re = new RegExp(key, 'g');
    const found = [...password.matchAll(re)];
    const count = found.length;
    return count >= range[0] && count <= range[1];
    // console.log(range, key, password, 'valid?', count >= range[0] && count <= range[1] );
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

