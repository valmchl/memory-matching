// Card Game Functions
const cardContainerEasy = document.querySelector('.card-container-1');
const timerEasy = document.querySelector('.timerEasy');
const resetEasyBtn = document.querySelector('#resetEasy');

let timerIntervalEasy;
let cardsEasy = [];
let matchedEasy = 0;
let firstCardEasy, secondCardEasy;
let lockBoard = false;
let gameStartedEasy = false;
let timeLeftEasy = 15;

// Imports
import { initModals } from "./modals.js";
const { showTimeUpModal, showWinModal, closeModals } = initModals();

// Fetch archon card data from JSON
fetch('./data/archons.json')
	.then((res) => res.json())
	.then((data) => {
		cardsEasy = [...data, ...data];
		shuffleCards();
		generateCards();
	});

// Shuffle cards randomly
function shuffleCards() {
	let currentIndex = cardsEasy.length,
		randomIndex,
		temporaryValue;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cardsEasy[currentIndex];
		cardsEasy[currentIndex] = cardsEasy[randomIndex];
		cardsEasy[randomIndex] = temporaryValue;
	}
}

// Generate cards on game board
function generateCards() {
	for (let card of cardsEasy) {
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
	if (!gameStartedEasy) {
		gameStartedEasy = true;
		timerEasy.textContent = timeLeftEasy;
		timerIntervalEasy = setInterval(updateTimer, 1000);
	}
}

// Flips a card and keeps it flipped
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

// Keep cards flipped (when matched)
function disableCards() {
	firstCardEasy.removeEventListener('click', flipCard);
	secondCardEasy.removeEventListener('click', flipCard);

	matchedEasy++;
	resetBoard();

	if (hasWon()) {
		clearInterval(timerIntervalEasy);
		setTimeout(() => {
			window.currentRestart = restart;
			showWinModal();
		}, 500);
	}
}

// Unflip cards (when not matched)
function unflipCards() {
	setTimeout(() => {
		firstCardEasy.classList.remove('flip');
		secondCardEasy.classList.remove('flip');
		resetBoard();
	}, 700);
}

// Return win condition
function hasWon() {
	return matchedEasy === cardsEasy.length / 2;
}

// Reset Cards on Board
function resetBoard() {
	firstCardEasy = null;
	secondCardEasy = null;
	lockBoard = false;
}

// Checks if selected cards are a match
function checkForMatch() {
	let isMatch = firstCardEasy.dataset.name === secondCardEasy.dataset.name;

	isMatch ? disableCards() : unflipCards();
}

// Countdown timer
function updateTimer() {
	if (timeLeftEasy > 0) {
		timeLeftEasy--;
		timerEasy.textContent = timeLeftEasy;

		// Change color of text based on time left
		if (timeLeftEasy <= 5) {
			timerEasy.style.color = 'red';
		} else if (timeLeftEasy <= 10) {
			timerEasy.style.color = 'orange';
		} else {
			timerEasy.style.color = '#233C58';
		}
	} else if (timeLeftEasy === 0) {
		clearInterval(timerIntervalEasy);
		window.currentRestart = restart;
		showTimeUpModal();
	}
}

// Restart Button and Function
resetEasyBtn.addEventListener('click', restart);
function restart() {
	clearInterval(timerIntervalEasy);
	timeLeftEasy = 15;
	timerEasy.textContent = timeLeftEasy;
	timerEasy.style.color = '#233C58';
	matchedEasy = 0;
	firstCardEasy = null;
	secondCardEasy = null;
	resetBoard();
	shuffleCards();
	cardContainerEasy.innerHTML = '';
	gameStartedEasy = false;
	generateCards();
}

window.currentRestart = restart;
