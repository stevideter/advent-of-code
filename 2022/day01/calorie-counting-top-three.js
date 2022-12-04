const fs = require('fs');

fs.readFile('./calorie-count-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let elfCalories = 0;
    let topThree = [0, 0, 0];
    input.forEach((i) => {
        if (!i) {
            topThree.push(elfCalories);
            topThree = topThree.sort((a, b) => b - a).slice(0, 3);
            elfCalories = 0;
        } else {
            elfCalories += parseInt(i);
        }
    });
    const sumWithInitial = topThree.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
    console.log(JSON.stringify({ topThree, sumWithInitial }));
});
