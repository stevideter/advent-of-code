const fs = require('fs');

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
    if (first.end < second.start) {
        return 0;
    }
    if (first.start > second.end) {
        return 0;
    }
    console.log(JSON.stringify({ msg: 'found overlap', first, second }));
    return 1;
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
        // console.log(assignments);
        overlaps += assignmentOverlaps(assignments);
    });
    console.log(JSON.stringify({ overlaps }));
});
