let playGame = true;
let rightNumber = parseInt(Math.random() * 15 + 1);
console.log(rightNumber);

let guessInput = document.getElementById('inNum');
let inputPerent = document.getElementById('input');
let matchShow = document.getElementById('matchShow');
let form = document.querySelector('.inputSection');
let previousGuess = document.querySelector('#previousGuess');
let remainingGuess = document.querySelector('#remainingGuess');
let guessResult = document.querySelector('#guessResult');
let submitBtn = document.querySelector('#submit');

let previousGuesses = [];
let guessRemaining = 3;

if (playGame) {
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        checkNumber(guessInput.value);
    });
} else {
    document.body.innerHTML = '<h2>You are not eligible to play this game</h2>';
}

function checkNumber(number) {
    number = parseInt(number);

    if (isNaN(number)) {
        alert("Please enter a valid number");
        inputClear();
    } else if (number < 1) {
        alert('Enter more than 0');
        inputClear();
    } else if (number > 15) {
        alert("Enter less than 15");
        inputClear();
    } else {
        previousGuesses.push(number);
        guessRemaining--;
        checkGuess(number);
    }
}

function checkGuess(number) {
    if (number === rightNumber) {
        winner();
    } 
    else {
        if (guessRemaining < 1) {
            guessInput.style.display = 'none'
            submitBtn.style.display = 'none'
            guessInfoF();
            setTimeout(gameOver,2000);
        }
        else if (number < rightNumber) {
            const message = `Your guess is too low`;
            guessMessage(message);
        } else if (number > rightNumber) {
            const message = `Your guess is too high`;
            guessMessage(message);
        }
        inputClear();
    }
}

function gameOver() {
    inputClear();
    const gameOverDiv = document.createElement('h5');
    const gameOverMessage = document.createTextNode(`Your all attempts are wrong. Right number was: ${rightNumber}. Click to play again.`);
    gameOverDiv.appendChild(gameOverMessage);
    gameOverDiv.classList.add('btn', 'btn-primary', 'mt-3');
    inputPerent.appendChild(gameOverDiv);
    matchShowCleaner();
    newGameStart(gameOverDiv);
}

function inputClear() {
    guessInput.value = '';
}

function guessMessage(message) {
    matchShow.innerText = message;
    guessInfoF();
}

function guessInfoF() {
    previousGuess.innerText = previousGuesses.join(', ');
    remainingGuess.innerText = guessRemaining;
}

function matchShowCleaner() {
    matchShow.innerText = '';
    guessResult.style.visibility = 'hidden';
}

function winner() {
    inputClear();
    const gameOverDiv = document.createElement('h5');
    const gameOverMessage = document.createTextNode(`🎉 Congratulations! You guessed the right number: ${rightNumber}. Click to play again.`);
    gameOverDiv.appendChild(gameOverMessage);
    gameOverDiv.classList.add('btn', 'btn-success', 'mt-3');
    inputPerent.appendChild(gameOverDiv);
    matchShowCleaner();
    newGameStart(gameOverDiv);
}

function newGameStart(btn) {
    btn.addEventListener('click', () => {
        previousGuesses = [];
        guessRemaining = 3;
        rightNumber = parseInt(Math.random() * 15 + 1); // Reset random number too
        console.log('New number:', rightNumber); // Optional: helpful during development
        guessResult.style.visibility = 'visible';
        previousGuess.innerText = '';
        guessInput.style.display = ''
            submitBtn.style.display = ''
        remainingGuess.innerText = guessRemaining;
        matchShow.innerText = '';
        btn.remove();
    });
}
