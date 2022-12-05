const fs = require('fs');
// Lowercase item types a through z have priorities 1 through 26. (charCodeAt 97-122)
// Uppercase item types A through Z have priorities 27 through 52. (charCodeAt 65-90)
function getPriority(duplicatedItem) {
    if (duplicatedItem >= 97 && duplicatedItem <= 122) {
        return duplicatedItem - 96;
    }
    return duplicatedItem - 38;
}
fs.readFile('./rucksack.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let prioritySum = 0;
    input.forEach((rucksack, index) => {
        const itemsPerCompartment = rucksack.length / 2;
        console.log(
            `Rucksack ${index} has ${itemsPerCompartment} items per compartment`
        );
        const items = {};
        for (let i = 0; i < itemsPerCompartment; i++) {
            items[rucksack.charAt(i)] = rucksack.charCodeAt(i);
        }
        let duplicatedItem;
        for (
            let i = itemsPerCompartment;
            i < rucksack.length && !duplicatedItem;
            i++
        ) {
            const inOtherCompartment = items[rucksack.charAt(i)];
            if (inOtherCompartment > 0) {
                duplicatedItem = inOtherCompartment;
            }
        }
        const priority = getPriority(duplicatedItem);
        console.log(
            `duplicated item ${duplicatedItem} has priority ${priority}`
        );
        prioritySum += priority;
    });
    console.log(JSON.stringify({ prioritySum }));
});
