const fs = require('fs');
// Lowercase item types a through z have priorities 1 through 26. (charCodeAt 97-122)
// Uppercase item types A through Z have priorities 27 through 52. (charCodeAt 65-90)
function getPriority(duplicatedItem) {
    if (duplicatedItem >= 97 && duplicatedItem <= 122) {
        return duplicatedItem - 96;
    }
    return duplicatedItem - 38;
}
function findBadge(group) {
    const items = group[0].split('');
    let intersection = [];
    for (let i = 0; i < group[1].length; i++) {
        const charToCheck = group[1].charAt(i);
        const mightBeBadge = items.includes(charToCheck);
        if (mightBeBadge) {
            intersection.push(charToCheck);
        }
    }
    let badge;
    for (let i = 0; i < group[2].length && !badge; i++) {
        const charToCheck = group[2].charAt(i);
        const mightBeBadge = intersection.includes(charToCheck);
        if (mightBeBadge) {
            console.log(`found badge ${charToCheck}`);
            badge = charToCheck;
        }
    }
    if (!badge) {
        console.error(
            `NO MATCH FOUND BETWEEN ${intersection} AND group ${group[2]}`
        );
    }
    const priority = getPriority(badge.charCodeAt(0));
    console.log(`badge ${badge} is priority ${priority}`);
    return priority;
}

fs.readFile('./rucksack.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let prioritySum = 0;
    let group = [];
    const GROUP_SIZE = 3;
    let groupCount = 0;
    input.forEach((rucksack) => {
        // get three elves
        group.push(rucksack);
        if (group.length === GROUP_SIZE) {
            prioritySum += findBadge(group);
            groupCount++;
            group = [];
        }
    });
    console.log(JSON.stringify({ prioritySum }));
});
