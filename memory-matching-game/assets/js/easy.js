// Card Game Functions
const cardContainerEasy = document.querySelector('.card-container-1');
const resetEasyBtn = document.querySelector('#resetEasy');
const easyGame = document.querySelector('#easy');
const timerEasy = document.querySelector('.timerEasy');
let timerInterval;
let cards = [];
let matched = 0;
let firstCardEasy, secondCardEasy;
let lockBoard = false;
let gameStarted = false;
let timeLeft = 15;

// Imports
import { initModals } from "./modals.js";
const { showTimeUpModal, showWinModal, closeModals } = initModals();

// Fetch archon card data from JSON
fetch('./data/archons.json')
	.then((res) => res.json())
	.then((data) => {
		cards = [...data, ...data];
		shuffleCards();
		generateCards();
	});

// Shuffle cards randomly
function shuffleCards() {
	let currentIndex = cards.length,
		randomIndex,
		temporaryValue;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cards[currentIndex];
		cards[currentIndex] = cards[randomIndex];
		cards[randomIndex] = temporaryValue;
	}
}

//Generate cards on game board
function generateCards() {
	for (let card of cards) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('memory-card', 'flex');
		cardElement.setAttribute('data-name', card.name);
		cardElement.innerHTML = `
            <div class="front-face">
                <img class="front-image" src="${card.image}" alt="${card.name}"/>
            </div>
            <div class="back-face"></div>
        `;
		cardContainerEasy.appendChild(cardElement);
		cardElement.addEventListener('click', flipCard);
	}
}

// Starts game and timer
function startTimer() {
	if (!gameStarted) {
		gameStarted = true;
		// updateTimer(); // to start timer immediately
		timerEasy.textContent = timeLeft;
		timerInterval = setInterval(updateTimer, 1000);
	}
}


//Flips a card and keeps it flipped
function flipCard() {
	startTimer();
	if (lockBoard) return;
	if (this === firstCardEasy) return;
	this.classList.add('flip');

	if (!firstCardEasy) {
		firstCardEasy = this;
		return;
	}

	secondCardEasy = this;
	lockBoard = true;

	checkForMatch();
}

//Keep cards flipped (when matched)
function disableCards() {
	firstCardEasy.removeEventListener('click', flipCard);
	secondCardEasy.removeEventListener('click', flipCard);

	matched++;
	resetBoard();

	if (hasWon()) {
		clearInterval(timerInterval);
		setTimeout(() => {
			// alert("Congrats! You matched all cards!");
			showWinModal();
		}, 500)
	}
}

//Unflip cards (when not matched)
function unflipCards() {
	setTimeout(() => {
		firstCardEasy.classList.remove('flip');
		secondCardEasy.classList.remove('flip');
		resetBoard();
	}, 700);
}

// Return win condition
function hasWon() {
	return matched === cards.length / 2;
}

//Reset Cards on Board
function resetBoard() {
	firstCardEasy = null;
	secondCardEasy = null;
	lockBoard = false;
}

//Checks if selected cards are a match
function checkForMatch() {
	let isMatch = firstCardEasy.dataset.name === secondCardEasy.dataset.name;

	isMatch ? disableCards() : unflipCards();
}

// Timer
function updateTimer() {

	if (timeLeft > 0) {
			timeLeft--
			timerEasy.textContent = timeLeft;

			if (timeLeft <= 5) {
			timerEasy.style.color = 'red';
			} else if (timeLeft <= 10) {
				timerEasy.style.color = 'orange';
			} else {
				timerEasy.style.color = '#233C58';
			}

		} else if (timeLeft === 0) {
			clearInterval(timerInterval);
			showTimeUpModal();
			// alert("Time is up!");
			restart();
		}
}

// Restart Button and Function
resetEasyBtn.addEventListener('click', restart);
function restart() {
	clearInterval(timerInterval);
	timeLeft = 15;
	timerEasy.textContent = timeLeft;
	timerEasy.style.color = '#233C58';
	matched = 0;
	firstCardEasy = null;
	secondCardEasy = null;
	resetBoard();
	shuffleCards();
	cardContainerEasy.innerHTML = '';
	gameStarted = false;
	generateCards();
	closeModals();
}

window.restart = restart;
