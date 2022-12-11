const fs = require('fs');

const bridge = [];
const INITIAL_HEIGHT = 5;
const INITIAL_WIDTH = 6;
const MOVE_TYPE = {
    RIGHT: 'R',
    LEFT: 'L',
    UP: 'U',
    DOWN: 'D',
};
const visitedSet = new Set();

let currentHeight = INITIAL_HEIGHT;
let currentWidth = INITIAL_WIDTH;
let state = {
    H: { x: 0, y: 0 },
    T: { x: 0, y: 0 },
};
function printBridge() {
    for (let yAxis = currentHeight - 1; yAxis > -1; yAxis--) {
        const row = bridge[yAxis];
        const display = row.reduce((previousValue, currentValue, xAxis) => {
            const { H, T } = state;
            if (yAxis === H.y && xAxis === H.x) {
                return previousValue.concat('H');
            }

            if (yAxis === T.y && xAxis === T.x) {
                return previousValue.concat('T');
            }
            if (yAxis === 0 && xAxis === 0) {
                return previousValue.concat('s');
            }
            return previousValue.concat(currentValue);
        }, '');
        console.log(display);
    }
    console.log('\n');
}

function updateHeight(additionalRows) {
    currentHeight = currentHeight + additionalRows;
    while (bridge.length < currentHeight) {
        bridge.push(Array(currentWidth).fill('.'));
    }
}
function updateWidth(additionalColumns) {
    currentWidth = currentWidth + additionalColumns;
    bridge.forEach((row) => {
        row.push(...Array(additionalColumns).fill('.'));
    });
}
function initializeBridge() {
    for (let i = 0; i < INITIAL_HEIGHT; i++) {
        bridge.push(Array(INITIAL_WIDTH).fill('.'));
    }
    moveTail();
    visitedSet.add('0,0');
    printBridge();
}
function calcDistance({ H, T }) {
    const diffX = H.x - T.x;
    const diffY = H.y - T.y;
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return distance;
}

function moveTail(direction) {
    const { H, T } = state;
    const distance = calcDistance({ H, T });
    console.log({ state, distance });
    if (distance < 2) {
        return;
    }
    if (distance === 2) {
        console.log('must move! on axis');
        if (direction === MOVE_TYPE.RIGHT) {
            T.x = T.x + 1;
        }
        if (direction === MOVE_TYPE.UP) {
            T.y = T.y + 1;
        }
        if (direction === MOVE_TYPE.LEFT) {
            T.x = T.x - 1;
        }
        if (direction === MOVE_TYPE.DOWN) {
            T.y = T.y - 1;
        }
    } else if (distance > 2) {
        console.log('must move! diagonally');
        if (direction === MOVE_TYPE.RIGHT) {
            T.y = H.y < T.y ? T.y - 1 : T.y + 1;
            T.x = T.x + 1;
        }
        if (direction === MOVE_TYPE.UP) {
            T.y = T.y + 1;
            T.x = H.x < T.x ? T.x - 1 : T.x + 1;
        }
        if (direction === MOVE_TYPE.DOWN) {
            T.x = H.x < T.x ? T.x - 1 : T.x + 1;
            T.y = T.y - 1;
        }
        if (direction === MOVE_TYPE.LEFT) {
            T.x = T.x - 1;
            T.y = H.y < T.y ? T.y - 1 : T.y + 1;
            console.log({ state });
        }
    }
    visitedSet.add(`${T.y},${T.x}`);
}
function moveMarkers(x, y, direction) {
    const { H, T } = state;
    H.x = x;
    H.y = y;
    moveTail(direction);
    printBridge();
}
function moveRight(move) {
    // console.log(move);
    const { steps, direction } = move;
    const { H, T } = state;
    const widthNeeded = steps + H.x + 1;
    if (widthNeeded > currentWidth) {
        updateWidth(widthNeeded - currentWidth);
    }
    for (let i = 1; i <= steps; i++) {
        moveMarkers(H.x + 1, H.y, direction);
    }
}
function moveLeft(move) {
    // console.log(move);
    const { steps, direction } = move;
    const { H, T } = state;
    for (let i = 1; i <= steps; i++) {
        moveMarkers(H.x - 1, H.y, direction);
    }
}
function moveUp(move) {
    // console.log(move);
    const { steps, direction } = move;
    const { H, T } = state;
    const heightNeeded = steps + H.y + 1;
    if (heightNeeded > currentHeight) {
        updateHeight(heightNeeded - currentHeight);
    }
    for (let i = 1; i <= steps; i++) {
        moveMarkers(H.x, H.y + 1, direction);
    }
}
function moveDown(move) {
    // console.log(move);
    const { steps, direction } = move;
    const { H, T } = state;
    for (let i = 1; i <= steps; i++) {
        moveMarkers(H.x, H.y - 1, direction);
    }
}

function doMove(move) {
    console.log(`\n== ${move.direction} ${move.steps} ==\n`);
    switch (move.direction) {
        case MOVE_TYPE.RIGHT:
            moveRight(move);
            break;
        case MOVE_TYPE.LEFT:
            moveLeft(move);
            break;
        case MOVE_TYPE.UP:
            moveUp(move);
            break;
        case MOVE_TYPE.DOWN:
            moveDown(move);
            break;
    }
}
fs.readFile(`${__dirname}/moves.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    initializeBridge();
    const moves = [];
    input.forEach((i) => {
        const move = i.split(' ');
        moves.push({
            direction: move[0],
            steps: parseInt(move[1]),
        });
    });
    moves.forEach((move) => {
        doMove(move);
    });
    console.log(visitedSet);
});
