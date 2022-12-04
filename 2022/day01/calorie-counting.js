const fs = require('fs')

fs.readFile('./calorie-count-input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const input = data.split('\n');
    let elfCalories = 0;
    let maxElfCalores = 0;
    input.forEach(i => {
        if (!i) {
            if (elfCalories > maxElfCalores) {
                maxElfCalores = elfCalories;
            }
            elfCalories = 0;
        } else {
            elfCalories += parseInt(i);
        }
    });
    console.log(JSON.stringify({ maxElfCalores }));
  });