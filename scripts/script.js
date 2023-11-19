let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlaying = false;
let intervalId;

updateScoreElement();

const autoPlayElement = document.querySelector('.js-auto-play-button');

autoPlayElement.addEventListener('click', () => {
  autoPlay();
});

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlayElement.innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayElement.innerHTML = 'Auto Play';
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'r':
      playGame('rock');
      break;
    case 'p':
      playGame('paper');
      break;
    case 's':
      playGame('scissors');
      break;
    case 'a':
      autoPlay();
      break;
    case 'Backspace':
      confirmationMessage();
      break;
    default:
      null;
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
    <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
    Computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

document
  .querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    confirmationMessage();
  });

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function confirmationMessage() {
  const confirmationMessage = document.querySelector(
    '.js-confirmation-message'
  );

  confirmationMessage.innerHTML = ` 
    Are you sure you want to reset the score?
    <button class="js-yes-button reset-confirm-button">Yes</button>
    <button class="js-no-button reset-confirm-button">No</button>
  `;

  const yesButton = document.querySelector('.js-yes-button');

  yesButton.addEventListener('click', () => {
    if (yesButton.innerHTML === 'Yes') {
      resetScore();
    }
    confirmationMessage.innerHTML = '';
  });

  const noButton = document.querySelector('.js-no-button');

  noButton.addEventListener('click', () => {
    if (noButton.innerHTML === 'No') {
      confirmationMessage.innerHTML = '';
    }
  });
}
