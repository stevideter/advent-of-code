
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
  const rowCount = lines.length;
  for (let i = 0; i < rowCount; i++) {
    let found = [];
    let members = 0;
    do {
      const values = lines[i];
      if (members < 1 ) {
        found = [...values];
      } else {
        found = [...values].filter(x => found.includes(x));
      }
      i++;
      members++;
      console.log({ members, found });
    } while (lines[i]);
    sum += found.length;
    console.log({ found, sum });
    questionaires++;
  }
  console.log({questionaires, sum});
});
