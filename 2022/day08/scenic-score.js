const fs = require('fs');

const grid = [];
let visibleTrees = 0;

function canSeeOver(treeToCheck, tree) {
    // console.log(
    //     `tree to check ${treeToCheck} and tree ${tree}: ${tree > treeToCheck}`
    // );
    return tree > treeToCheck;
}
let length = 0;
let height = 0;
function getLeftScore(tree, x, y) {
    // console.log('getLeftScore');
    let score = 0;
    if (y === 0) {
        return score;
    }
    let seeOver = true;
    for (let left = y - 1; left > -1 && seeOver; left--) {
        score++;
        const treeToCheck = grid[x][left];
        seeOver = canSeeOver(treeToCheck, tree);
    }
    return score;
}
function getRightScore(tree, x, y) {
    // console.log('getRightScore');
    let score = 0;
    if (y === length - 1) {
        return score;
    }
    let seeOver = true;
    for (let left = y + 1; left < length && seeOver; left++) {
        score++;
        const treeToCheck = grid[x][left];
        seeOver = canSeeOver(treeToCheck, tree);
    }
    return score;
}
function getTopScore(tree, x, y) {
    // console.log('getTopScore');
    let score = 0;
    if (x === 0) {
        return score;
    }
    let seeOver = true;
    for (let top = x - 1; top > -1 && seeOver; top--) {
        score++;
        const treeToCheck = grid[top][y];
        seeOver = canSeeOver(treeToCheck, tree);
    }
    return score;
}
function getBottomScore(tree, x, y) {
    // console.log('getBottomScore');
    let score = 0;
    if (x === height - 1) {
        return score;
    }
    let seeOver = true;
    for (let bottom = x + 1; bottom < height && seeOver; bottom++) {
        score++;
        const treeToCheck = grid[bottom][y];
        seeOver = canSeeOver(treeToCheck, tree);
    }
    return score;
}

function calculateScenicSore(tree, x, y) {
    console.log({ msg: 'calculating scenic score', tree, x, y });
    const checks = [getLeftScore, getRightScore, getTopScore, getBottomScore];
    const scores = checks.map((scorer) => {
        return scorer(tree, x, y);
    });
    const totalScore = scores.reduce(
        (accumulator, score) => accumulator * score
    );
    console.log({ msg: 'got score', tree, x, y, scores, totalScore });
    return totalScore;
}
let maxScore = 0;
fs.readFile(`${__dirname}/trees.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    input.forEach((line, index) => {
        grid.push(Array.from(line));
        if (length === 0) {
            length = line.length;
        }
    });
    height = grid.length;
    console.log({ grid, length, height });
    grid.forEach((row, x) => {
        row.forEach((tree, y) => {
            const score = calculateScenicSore(tree, x, y);
            if (score > maxScore) {
                maxScore = score;
            }
        });
    });
    console.log({ maxScore });
});
