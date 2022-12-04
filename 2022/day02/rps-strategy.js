const fs = require('fs');

// Your total score is the sum of your scores for each round.
// The score for a single round is the score for the shape you selected
// (1 for Rock, 2 for Paper, and 3 for Scissors)
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.
const WIN = 6;
const DRAW = 3;

const OPPONENT_PAPER = 'B';
const OPPONENT_SCISSORS = 'C';

const SELF_DRAW = 'Y';
const SELF_WIN = 'Z';

const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

function win(opponent) {
    console.log('WIN');
    if (opponent === OPPONENT_SCISSORS) {
        return WIN + ROCK_SCORE;
    }
    if (opponent === OPPONENT_PAPER) {
        return WIN + SCISSORS_SCORE;
    }
    return WIN + PAPER_SCORE;
}
function draw(opponent) {
    console.log('DRAW');

    if (opponent === OPPONENT_SCISSORS) {
        return DRAW + SCISSORS_SCORE;
    }
    if (opponent === OPPONENT_PAPER) {
        return DRAW + PAPER_SCORE;
    }
    return DRAW + ROCK_SCORE;
}

function lose(opponent) {
    console.log('LOSE');

    if (opponent === OPPONENT_SCISSORS) {
        return PAPER_SCORE;
    }
    if (opponent === OPPONENT_PAPER) {
        return ROCK_SCORE;
    }
    return SCISSORS_SCORE;
}

function score(opponent, self) {
    let outcome = 0;
    if (self === SELF_WIN) {
        const score = win(opponent);
        console.log(
            `For opponent ${opponent} and self ${self} WIN! score is ${score} `
        );
        outcome += score;
    } else if (self === SELF_DRAW) {
        const score = draw(opponent);
        console.log(
            `For opponent ${opponent} and self ${self} DRAW! score is ${score} `
        );
        outcome += score;
    } else {
        const score = lose(opponent);
        console.log(
            `For opponent ${opponent} and self ${self} LOSE! score is ${score} `
        );
        outcome += score;
    }
    return outcome;
}

fs.readFile('./strategy-guide.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.split('\n');
    let totalScore = 0;
    input.forEach((round) => {
        const plays = round.split(' ');
        totalScore += score(plays[0], plays[1]);
    });
    console.log(JSON.stringify(totalScore));
});
