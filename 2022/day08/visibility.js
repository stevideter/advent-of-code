const fs = require('fs');

const grid = [];
let visibleTrees = 0;
function isNotBlocked(treeToCheck, tree) {
    console.log(
        `tree to check ${treeToCheck} and tree ${tree}: ${tree > treeToCheck}`
    );
    return tree > treeToCheck;
}
function checkLeft(tree, x, y) {
    console.log('checkLeft');

    for (let left = 0; left < y; left++) {
        const treeToCheck = grid[x][left];
        const notBlocked = isNotBlocked(treeToCheck, tree);
        if (!notBlocked) {
            return false;
        }
    }
    return true;
}
function checkRight(tree, x, y) {
    for (let right = y + 1; right < length; right++) {
        const treeToCheck = grid[x][right];
        const notBlocked = isNotBlocked(treeToCheck, tree);
        if (!notBlocked) {
            return false;
        }
    }
    return true;
}
function checkTop(tree, x, y) {
    for (let top = 0; top < x; top++) {
        const treeToCheck = grid[top][y];
        const notBlocked = isNotBlocked(treeToCheck, tree);
        if (!notBlocked) {
            return false;
        }
    }
    return true;
}
function checkBottom(tree, x, y) {
    for (let bottom = x + 1; bottom < height; bottom++) {
        const treeToCheck = grid[bottom][y];
        console.log(`is tree ${tree} visible behind ${treeToCheck}`);
        const notBlocked = isNotBlocked(treeToCheck, tree);
        console.log(`does the checked tree block the tree? ${notBlocked}`);
        if (!notBlocked) {
            return false;
        }
    }
    return true;
}

function isOnOutside(_, x, y) {
    console.log('isOnOutside');
    let visible = false;
    if (x === 0 || x === length - 1 || y === 0 || y === height - 1) {
        visible = true;
    }
    return visible;
}
function isVisible(tree, x, y) {
    let visible = false;
    const checks = [isOnOutside, checkLeft, checkRight, checkTop, checkBottom];
    for (let check = 0; check < checks.length && !visible; check++) {
        visible = checks[check](tree, x, y);
    }
    if (visible) {
        visibleTrees++;
    }
}
let length = 0;
let height = 0;

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
            isVisible(tree, x, y);
        });
    });
    console.log({ visibleTrees });
});
