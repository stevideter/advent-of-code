/*
Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)

only cid is optional
*/

const fs = require("fs");
const { exit } = require("process");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].sort();
const requiredFieldCount = requiredFields.length;
function validatePassport(found) {
    if (found.length > requiredFieldCount) return true;
    if (found.length === requiredFieldCount) {
        const sorted = found.concat().sort();
        for (let i = 0; i < requiredFields.length; i++) {
            if (sorted[i] !== requiredFields[i]) {
                return false;
             }
        }
        return true;
    }
    return false;
}
fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  const lines = data.split("\n");
  console.log(`there are ${lines.length} rows to traverse`);
  // console.log(lines);
  let passports = 0;
  let validPassports = 0;
  for (let i = 0; i < lines.length; i++) {
    const found = [];
    do {
      const values = lines[i].split(' ');
      values.forEach((value) => {
        const pair = value.split(':');
        found.push(pair[0]);
      });
      i++;
    } while (lines[i]);
    if (validatePassport(found)) {
        validPassports++;
    }
    passports++;
  }
  console.log(`found ${passports} passports and ${validPassports} valid ones`);
});
