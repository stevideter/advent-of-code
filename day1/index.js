// Find the three entries that sum to 2020; what do you get if you multiply them together?
const fs = require('fs')

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const input = data.split('\n');
  const length = input.length;
  const target = 2020;
  let found = false;
  // search down the line for an a, b, and c that equal the target
  for (let a = 0; !found && a < length - 3 ; a++) {
      const numberA = Number.parseInt(input[a]);
      for (let b = (a+1); !found && b < length - 2; b++) {
          const numberB = Number.parseInt(input[b]);
          for (let c = (b+1); !found && c < length -1; c++) {
              const numberC = Number.parseInt(input[c]);
              const sum = numberA + numberB + numberC;
              found = (sum === target);
              if (found) {
                  const result = numberA * numberB * numberC;
                  console.log(numberA, numberB, numberC, sum, result);
              }
          }
      }
  }
//   const pairs = {};
//   input.some((value) => {
//       const remainder = 2020 - value;
//       if (pairs[remainder]) {
//           const result = value * remainder;
//           console.log(value, remainder, result);
//           return true;
//       } else {
//           pairs[value] = 2020 - value;
//           return false;
//       }
//   });
//   console.log(pairs);
});