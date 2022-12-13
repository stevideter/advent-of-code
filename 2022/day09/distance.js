function calcDistance({ H, T }) {
    const diffX = H.x - T.x;
    const diffY = H.y - T.y;
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return distance;
}

console.log(calcDistance({ H: { x: 2, y: 3 }, T: { x: 4, y: 2 } }));

const A = { x: 2, y: 3 };

const points = [
    { x: 4, y: 3 },
    { x: 4, y: 2 },
    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 4, y: 4 },
];
// const B = { x: 4, y: 3 };
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
        if (A.y > B.x) {
            C.x = B.x + 1;
        }
        if (A.y < B.y) {
            C.y = B.y - 1;
        }
        if (A.y > B.y) {
            C.y = B.y + 1;
        }
    }
    console.log({ A, B, C });
}

points.forEach((point) => {
    getMoves({ A, B: point });
});
