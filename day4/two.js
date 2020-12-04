/*
Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.

only cid is optional
*/

const fs = require("fs");
const { exit } = require("process");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].sort();
const requiredFieldCount = requiredFields.length;
const hclRegex = /^#[a-z0-9]{6}$/;
const pidRegex = /^[0-9]{9}$/;
function validateRange(value, start, end) {
  if (!value) {
    return false;
  }
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return false;
  }
  if (parsed < start || parsed > end) {
    return false;
  }
  return true;
}
function validateHeight(hgt) {
  if (!hgt) {
    return false;
  }
  if (hgt.endsWith('cm')) {
    return validateRange(hgt.slice(0, -2), 150, 193);
  } else if (hgt.endsWith('in')) {
    return validateRange(hgt.slice(0, -2), 59, 76);
  }
  return false;
}
function validateHairColor(hcl) {
  return hcl && hclRegex.test(hcl);
}
const eclColors =['amb','blu','brn','gry','grn','hzl','oth'];
function validateEyeColor(ecl) {
  return ecl && eclColors.includes(ecl);
}
function validatePassportId(pid) {
  return pid && pidRegex.test(pid);
}
function validatePassport(found) {
  const fieldsFound = Object.keys(found).length;
  if (fieldsFound < requiredFieldCount) {
    return false;
  }
  if (!validateRange(found.byr, 1920, 2002)) {
    return false;
  }
  if (!validateRange(found.iyr, 2010, 2020)) {
    return false;
  }
  if (!validateRange(found.eyr, 2020, 2030)) {
    return false;
  }
  if (!validateHeight(found.hgt)) {
    return false;
  }
  if (!validateHairColor(found.hcl)) {
    return false;
  }
  if (!validateEyeColor(found.ecl)) {
    return false;
  };
  return validatePassportId(found.pid);
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
    const found = {};
    do {
      const values = lines[i].split(" ");
      values.forEach((value) => {
        const pair = value.split(":");
        found[pair[0]] = pair[1];
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
