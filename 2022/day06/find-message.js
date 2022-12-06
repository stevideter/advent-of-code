const fs = require('fs');

const MARKER_LENGTH = 14;
function validMarker(test) {
    const set1 = new Set();
    if (test.length === MARKER_LENGTH) {
        const chars = Array.from(test);
        chars.forEach((c) => set1.add(c));
    }
    return set1.size === MARKER_LENGTH;
}

function findMarker(stream) {
    let start = 0;
    let end = MARKER_LENGTH;
    let result = false;
    while (!result && end < stream.length) {
        let test = stream.slice(start, end);
        result = validMarker(test);
        // console.log(JSON.stringify({ test, start, end, result }));
        if (!result) {
            end++;
            start++;
        }
    }
    return end;
}

fs.readFile('./datastream.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    const stream = input[0];
    const result = findMarker(stream);
    console.log(JSON.stringify({ result }));
});
