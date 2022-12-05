const fs = require('fs');
const { send } = require('process');

// In how many assignment pairs does one range fully contain the other?
function assignmentOverlaps(pair) {
    const assignments = [];
    pair.forEach((p) => {
        const items = p.split('-');
        assignments.push({
            start: parseInt(items[0]),
            end: parseInt(items[1]),
        });
    });
    const first = assignments[0];
    const second = assignments[1];
    console.log(JSON.stringify({ first, second }));
    if (first.start <= second.start) {
        if (first.end >= second.end) {
            console.log('first contains second');
            return 1;
        }
    }
    if (second.start <= first.start) {
        if (second.end >= first.end) {
            console.log('second contains first');
            return 1;
        }
    }
    return 0;
}

fs.readFile('./assignments.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    console.log(`there are ${input.length} pairs`);
    let overlaps = 0;
    input.forEach((pair) => {
        const assignments = pair.split(',');
        console.log(assignments);
        overlaps += assignmentOverlaps(assignments);
    });
    console.log(JSON.stringify({ overlaps }));
});
