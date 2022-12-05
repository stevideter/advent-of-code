
const fs = require("fs");
const { exit } = require("process");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  const lines = data.split("\n");
  console.log(`there are ${lines.length} tickets to process`);
  let questionaires = 0;
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const found = new Set();
    do {
      const values = lines[i];
      for (let j = 0; j < values.length; j++ ) {
        found.add(values[j]);
      }
      i++;
    } while (lines[i]);
    sum += found.size;
    console.log({ found, sum });
    questionaires++;
  }
  console.log({questionaires, sum});
});
