const squares = document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('#score-display');
const startBtn = document.querySelector('.start');

const width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0] // 2 = head 0 = tail
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

// to start, restart game
function startGame() {
  // for clear
  score = 0;
  currentSnake.forEach(number => squares[number].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(interval);

  // for restart
  randomApple();
  direction = 1;
  scoreDisplay.textContent = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach(number => squares[number].classList.add('snake'));
  interval = setInterval(moveOutComes, intervalTime);
}

function moveOutComes() {
  // if snake hitting border or self
  if (
    // if snake hits bottom
    (currentSnake[0] + width >= (width * width) && direction === width) ||
    // if snake hits right wall
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    // if snake hits left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    // if snake hits top wall
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    clearInterval(interval) // game over clear
    scoreDisplay.textContent = 'Game over, Your score: ' + score;
  }

  const tail = currentSnake.pop(); // remove last item of currentSnake
  squares[tail].classList.remove('snake'); // remove class of snake from tail
  currentSnake.unshift(currentSnake[0] + direction); // give direction to head
  squares[currentSnake[0]].classList.add('snake');

  // if snake getting apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    // up intervalTime (up game speed)
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutComes, intervalTime);
  }

}

// random apple until square not have snake class
function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

function control(e) {
  squares[currentIndex].classList.remove('snake');

  // when press arrowRight key
  if (e.keyCode === 39) {
    direction = 1;
  }
  // when press arrowUp key
  else if (e.keyCode === 38) {
    direction = -width;
  }
  // when press arrowLeft key
  else if (e.keyCode === 37) {
    direction = - 1;
  }
  // when press arrowDown key
  else if (e.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener('keyup', control);
startBtn.addEventListener('click', startGame);

