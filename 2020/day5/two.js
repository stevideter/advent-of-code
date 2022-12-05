/**
 * The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.
 *
 * The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.
 *
 * Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.
 *
 * What is the highest seat ID on a boarding pass?
 */
const fs = require("fs");
const { exit } = require("process");
const rows = 128;
const columns = 8;
const magicNmber = 8;
const manifest = [128];
const decodeSeat = (seatCode) => {
  let range = [0, 127];
  for (let r = 0; r < 7; r++) {
    const seatRange = seatCode[r];
    const diff = (range[1] - range[0]) / 2 + range[0];
    if ("F" == seatRange) {
      // const top =               ((range[1]-range[0])/2)+range[0];
      range[1] = Math.floor(diff);
    } else {
      // const bottom = range[0] + ((range[1]-range[0])/2);
      range[0] = Math.ceil(diff);
    }
    console.log({ seatRange, range });
  }
  const row = range[0];
  if (!manifest[row]) {
    manifest[row] = ['-','-','-','-','-','-','-','-'];
  }
  const rowRange = [0, 7];
  for (let s = 7; s < seatCode.length; s++) {
    const diff = (rowRange[1] - rowRange[0]) / 2 + rowRange[0];
    if ("L" == seatCode[s]) {
      rowRange[1] = Math.floor(diff);
    } else {
      rowRange[0] = Math.ceil(diff);
    }
    console.log({ seat: seatCode[s], rowRange });
  }
  const seat = rowRange[0];
  manifest[row][seat] = 'x';
  return (row * magicNmber) + seat;
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  const lines = data.split("\n");
  console.log(`there are ${lines.length} tickets to process`);
  // const maxSeatId = 127 * 8 + 7;
  // console.log(`max seat id is ${maxSeatId}`);
  let maxSeatId = 0;
  let updated=0;
  lines.forEach((seatCode) => {
    const seatCodeId = decodeSeat(seatCode);
    if (seatCodeId > maxSeatId) {
      maxSeatId = seatCodeId;
      updated++;
    }
  });  
  
  console.log({ maxSeatId, updated});
  const unfilledSeats = [];
  for (let i = 0; i < manifest.length; i++) {
    const aRow = manifest[i];
    if (aRow) {
      for (let j = 0; j < aRow.length; j++) {
        if ('-' === aRow[j]) {
          unfilledSeats.push((i * magicNmber) + j);
        }
      }
  
    } else {console.log(`no row ${i}`)};
  }
  console.log(unfilledSeats);
});
