// Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

const fs = require('fs');
const { exit } = require('process');
const right = 3;
const down = 1;
const treeSymbol = '#';

fs.readFile('./input.txt', 'utf8' , (err, data) => {
    let x = 0;
    let y = 0;
    if (err) {
        console.error(err);
        exit(1);
    }
    const entries = data.split('\n');
    console.log(`there are ${entries.length} rows to traverse`);
    let trees = 0;
    const width = entries[0].length;
    while (y < (entries.length -1)) {
        y+=down;
        x+=right;
        if (x >= width) {
            // console.log(`x is now ${x} which is greater than width ${width} `);
            x = x - width;
            // console.log(`reset x to ${x}`);
        }
        // console.log(`y is ${y} and x is ${x}`);
        const spot = entries[y][x];
        // console.log(spot);
        if (treeSymbol === spot) {
            trees++;
        }
    }

    console.log('found', trees, y, x);
});

