const fs = require('fs');

// Your total score is the sum of your scores for each round.
// The score for a single round is the score for the shape you selected
// (1 for Rock, 2 for Paper, and 3 for Scissors)
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.
const WIN = 6;
const DRAW = 3;
const LOSE = 0;
const OPPONENT_ROCK = 'A';
const OPPONENT_PAPER = 'B';
const OPPONENT_SCISSORS = 'C';
const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

const LOSE_STRATEGY = {
    strategy: 'X',
    score: LOSE,
    cardScore: {
        [OPPONENT_PAPER]: ROCK_SCORE,
        [OPPONENT_SCISSORS]: PAPER_SCORE,
        [OPPONENT_ROCK]: SCISSORS_SCORE,
    },
};
const DRAW_STRATEGY = {
    strategy: 'Y',
    score: DRAW,
    cardScore: {
        [OPPONENT_PAPER]: PAPER_SCORE,
        [OPPONENT_SCISSORS]: SCISSORS_SCORE,
        [OPPONENT_ROCK]: ROCK_SCORE,
    },
};

const WIN_STRATEGY = {
    strategy: 'Z',
    score: WIN,
    cardScore: {
        [OPPONENT_PAPER]: SCISSORS_SCORE,
        [OPPONENT_SCISSORS]: ROCK_SCORE,
        [OPPONENT_ROCK]: PAPER_SCORE,
    },
};
const strategies = [WIN_STRATEGY, LOSE_STRATEGY, DRAW_STRATEGY];

function score(opponent, self) {
    const strategy = strategies.find((str) => str.strategy === self);
    return strategy.cardScore[opponent] + strategy.score;
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
