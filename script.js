'use strict';

//SELECTING ELEMENTS AND STORING THEM INTO VARIABLES TO USE LATER
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const score0Element = document.getElementById(`score--0`);
const score1Element = document.getElementById(`score--1`);
const current0Element = document.getElementById(`current--0`);
const current1Element = document.getElementById(`current--1`);
const diceElement = document.querySelector(`.dice`);
const buttonNew = document.querySelector(`.btn--new`);
const buttonRoll = document.querySelector(`.btn--roll`);
const buttonHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

//STARTING CONDITIONS

const startingConditions = function () {
  //PLAYER MAIN SOCRES, THAT ACCUMULATE
  scores = [0, 0];
  //CURRENT SCORE VARIABLE
  currentScore = 0;
  //ACTIVE PLAYER 0 = PLAYER 1 , 1 = PLAYER 2
  activePlayer = 0;
  //FOR RECOGNISING IF GAME IS DONE OR NOT
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;

  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add(`hidden`);

  player0Element.classList.remove(`player--winner`);
  player1Element.classList.remove(`player--winner`);
  player0Element.classList.add(`player--active`);
  player1Element.classList.remove(`player--active`);
};

startingConditions();

//SWITCHING PLAYER FUNCTION

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle(`player--active`);
  player1Element.classList.toggle(`player--active`);
};
//ROLLING DICE FUNCTIONALITY
buttonRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. GENERATING A RANDOM DICE ROLL(NUMBER)
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. DISPLAY DICE (PICTURE)
    diceElement.classList.remove(`hidden`);
    diceElement.src = `dice-${dice}.png`;
    //3. CHECK IF ROLLED 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //4. SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

buttonHold.addEventListener(`click`, function () {
  if (playing) {
    //1.ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE
    // what is happening below : scores[player1] = scores[player1] + currantScore
    scores[activePlayer] += currentScore;
    //DISPLAYING SCORE
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.CHECK IF PLAYERS SCORE IS >=100
    if (scores[activePlayer] >= 100) {
      //3.GAME FINISHES(PLAYER WINS)
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //4.SWITCH TO NEXT PLATER IF SCORE IS LESS THAN 100
      switchPlayer();
    }
  }
});

buttonNew.addEventListener(`click`, startingConditions);
