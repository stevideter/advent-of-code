const fs = require('fs');

// Your total score is the sum of your scores for each round.
// The score for a single round is the score for the shape you selected
// (1 for Rock, 2 for Paper, and 3 for Scissors)
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.
const WIN = 6;
const DRAW = 3;
const OPPONENT_ROCK = 'A';
const OPPONENT_PAPER = 'B';
const OPPONENT_SCISSORS = 'C';
const SELF_ROCK = 'X';
const SELF_PAPER = 'Y';
const SELF_SCISSORS = 'Z';

const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

function win(opponent, self) {
    return (
        (self === SELF_ROCK && opponent === OPPONENT_SCISSORS) ||
        (self === SELF_SCISSORS && opponent == OPPONENT_PAPER) ||
        (self === SELF_PAPER && opponent == OPPONENT_ROCK)
    );
}
function draw(opponent, self) {
    return (
        (self === SELF_ROCK && opponent === OPPONENT_ROCK) ||
        (self === SELF_SCISSORS && opponent == OPPONENT_SCISSORS) ||
        (self === SELF_PAPER && opponent == OPPONENT_PAPER)
    );
}
function score(opponent, self) {
    let outcome = 0;
    if (win(opponent, self)) {
        outcome += WIN;
    } else if (draw(opponent, self)) {
        outcome += DRAW;
    }

    if (self === SELF_ROCK) {
        outcome += ROCK_SCORE;
    } else if (self === SELF_PAPER) {
        outcome += PAPER_SCORE;
    } else {
        outcome += SCISSORS_SCORE;
    }
    return outcome;
}
// column 0:
// A for Rock, B for Paper, and C for Scissors.
// column 1:
// X for Rock, Y for Paper, and Z for Scissors
// for each round is win, draw, or lose?
fs.readFile('./strategy-guide.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let totalScore = 0;
    input.forEach((round) => {
        const plays = round.split(' ');
        // console.log(JSON.stringify({ plays }));
        totalScore += score(plays[0], plays[1]);
    });
    console.log(JSON.stringify(totalScore));
});
