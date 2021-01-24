'use strict';

let currentPlayer = 0;
const scorePlayerZero = document.querySelector('#score--0');
const scorePlayerOne = document.querySelector('#score--1');
const rollingDice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const holdRolling = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

scorePlayerZero.textContent = 0;
scorePlayerOne.textContent = 0;
rollingDice.classList.add('hidden');

let switchPlayer = function () {
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    document.querySelector(`.player--${currentPlayer}`).classList.toggle('player--active');
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${currentPlayer}`).classList.toggle('player--active');
}

let winnerResults = function(totalScore,currentScore) {
    document.querySelector(`#score--${currentPlayer}`).textContent = totalScore + currentScore;
    document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    rollDice.classList.add('hidden');
    holdRolling.classList.add('hidden');
    rollingDice.classList.add('hidden');
}

rollDice.addEventListener('click', function () {
  let diceRoll = Math.trunc(Math.random() * 6) + 1;
  rollingDice.classList.remove('hidden');
  rollingDice.src = `dice-${diceRoll}.png`;
  let currentScore = Number(document.querySelector('#current--' + currentPlayer).textContent);

  if (diceRoll !== 1) {
    currentScore += diceRoll;
    
    document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;

    let totalScore = Number(document.querySelector(`#score--${currentPlayer}`).textContent);
    if(totalScore + currentScore >= 50) {
        winnerResults(totalScore,currentScore);
    }
  } else {
        currentScore = 0;
        switchPlayer();
  }
});

holdRolling.addEventListener('click', function () {
  let currentScore = Number(document.querySelector(`#current--${currentPlayer}`).textContent);
  let totalScore = Number(document.querySelector(`#score--${currentPlayer}`).textContent);
  document.querySelector(`#score--${currentPlayer}`).textContent = totalScore + currentScore;
  if(totalScore + currentScore < 50) {
    switchPlayer();
  } else {
    winnerResults(totalScore,currentScore);
  }
});

newGame.addEventListener('click', function () {
    for (let i = 0; i < 2; i++) {
      document.querySelector('#current--' + i).textContent = 0;
      document.querySelector('#score--' + i).textContent = 0;
    }
    rollingDice.classList.add('hidden');
    rollDice.classList.remove('hidden');
    holdRolling.classList.remove('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
});
