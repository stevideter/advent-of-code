const fs = require('fs');
const { exit } = require('process');

const bridge = [];
const INITIAL_HEIGHT = 500;
const INITIAL_WIDTH = 500;
const MOVE_TYPE = {
    RIGHT: 'R',
    LEFT: 'L',
    UP: 'U',
    DOWN: 'D',
};
const visitedSet = new Set();
const KNOTS = 9;
let state = {
    // H: { x: INITIAL_WIDTH / 2, y: INITIAL_HEIGHT / 2 },
    // T: { x: INITIAL_WIDTH / 2, y: INITIAL_HEIGHT / 2 },
};

function printBridge() {
    for (let yAxis = INITIAL_HEIGHT - 1; yAxis > -1; yAxis--) {
        const row = bridge[yAxis];
        const display = row.reduce((previousValue, currentValue, xAxis) => {
            const { H, T } = state;
            if (yAxis === H.y && xAxis === H.x) {
                return previousValue.concat('H');
            }
            for (let knot = 1; knot <= KNOTS; knot++) {
                const currentKnot = state[`knot${knot}`];
                if (yAxis === currentKnot.y && xAxis === currentKnot.x) {
                    return previousValue.concat(`${knot}`);
                }
            }

            if (yAxis === 15 && xAxis === 15) {
                return previousValue.concat('s');
            }
            return previousValue.concat(currentValue);
        }, '');
        console.log(display + ' ' + yAxis);
    }
    console.log('\n');
}

function initializeBridge() {
    let initialX = INITIAL_WIDTH / 2;
    let initialY = INITIAL_HEIGHT / 2;
    state.H = { x: initialX, y: initialY };
    state.S = { x: initialX, y: initialY };
    for (let count = 1; count <= KNOTS; count++) {
        state[`knot${count}`] = { x: initialX, y: initialY };
    }
    for (let i = 0; i < INITIAL_HEIGHT; i++) {
        bridge.push(Array(INITIAL_WIDTH).fill('.'));
    }
    visitedSet.add(`${state.knot9.x},${state.knot9.y}`);
    // console.log({ initialX, initialY });
    // printBridge();
}
function calcDistance({ H, T }) {
    const diffX = H.x - T.x;
    const diffY = H.y - T.y;
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return distance;
}
function getMoves({ A, B }) {
    let C = { x: B.x, y: B.y };
    if (A.x === B.x) {
        const diffY = (A.y - B.y) / 2;
        C.y = B.y + diffY;
    } else if (A.y === B.y) {
        const diffX = (A.x - B.x) / 2;
        C.x = B.x + diffX;
    } else {
        if (A.x < B.x) {
            C.x = B.x - 1;
        }
        if (A.x > B.x) {
            C.x = B.x + 1;
        }
        if (A.y < B.y) {
            C.y = B.y - 1;
        }
        if (A.y > B.y) {
            C.y = B.y + 1;
        }
    }
    // console.log({ A, B, C });
    return C;
}
function moveTail(direction, first, second) {
    // const { H, knot9 } = state;
    let currentDirection = direction;
    const distance = calcDistance({ H: first, T: second });
    // console.log({ state, distance });
    if (distance < 2) {
        return currentDirection;
    }
    const C = getMoves({ A: first, B: second });
    second.x = C.x;
    second.y = C.y;
    return currentDirection;
}
function moveMarkers(x, y, direction) {
    if (x < 0 || y < 0) {
        throw new Error('out of range');
    }
    const { H, knot1 } = state;
    H.x = x;
    H.y = y;
    let first = H;
    let currentDirection = direction;
    for (let knot = 1; knot <= KNOTS; knot++) {
        const second = state[`knot${knot}`];
        // console.log({
        //     msg: `checking knot${knot}`,
        //     currentDirection,
        //     first,
        //     second,
        // });
        currentDirection = moveTail(currentDirection, first, second);
        first = second;
    }
    visitedSet.add(`${state.knot9.y},${state.knot9.x}`);
    // printBridge();
}
function moveRight(move) {
    // console.log(move);
    const { steps, direction } = move;
    const { H, T } = state;
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
    // console.log(`\n== ${move.direction} ${move.steps} ==\n`);
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
    moves.forEach((move, index) => {
        try {
            doMove(move);
        } catch (err) {
            console.log(err);
            console.log(`failed at ${index}`);
            exit(1);
        }
    });
    console.log(visitedSet.size);
    // console.log(visitedSet);
    // printBridge();
});
