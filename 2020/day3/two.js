// Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:
/*
Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?
*/
const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];

const fs = require('fs');
const { exit } = require('process');
const treeSymbol = '#';
let entries;
function countTreesOnPath(width, right, down) {
    let x = 0;
    let y = 0;
    let trees = 0;
    while (y < (entries.length - 1)) {
        y += down;
        x += right;
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
    return trees;
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        exit(1);
    }
    entries = data.split('\n');
    console.log(`there are ${entries.length} rows to traverse`);
    const width = entries[0].length;
    let trees = 1;
    slopes.forEach((slope) => {
        trees *= countTreesOnPath(width, slope[0], slope[1]);
    });
    
    console.log('found', trees);
});

