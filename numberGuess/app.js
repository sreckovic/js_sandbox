/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 2,
  max = 12,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  msg = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function(e) {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMsg(`Please enter number between ${min} and ${max}`, 'red');
  }

  if (guess === winningNum) {
    // guessInput.disabled = true;
    // guessInput.style.borderColor = 'green;
    // setMsg(`${winningNum} is correct number. You Win!`, 'gree');
    gameOver(true, `${winningNum} is correct number. You Win!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game lost!
      // guessInput.disabled = true;
      // guessInput.style.borderColor = 'red';
      // setMsg(
      //   `Game over, you lost. The correct number was ${winningNum}.`,
      //   'red'
      // );
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}.`
      );
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMsg(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
    }
  }

  e.preventDefault();
});

function gameOver(won, msgText) {
  guessInput.disabled = true;
  guessInput.style.borderColor = won ? 'green' : 'red';
  setMsg(msgText, won ? 'green' : 'red');

  guessBtn.value = 'Play Again?';
  guessBtn.className += 'play-again';
}

function setMsg(msgText, color) {
  msg.style.color = color;
  msg.textContent = msgText;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
