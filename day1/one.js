// Find the two entries that sum to 2020; what do you get if you multiply them together?
const fs = require('fs')

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const input = data.split('\n');
  const pairs = {};
  input.some((value) => {
      const remainder = 2020 - value;
      if (pairs[remainder]) {
          const result = value * remainder;
          console.log(value, remainder, result);
          return true;
      } else {
          pairs[value] = 2020 - value;
          return false;
      }
  });
//   console.log(pairs);
});