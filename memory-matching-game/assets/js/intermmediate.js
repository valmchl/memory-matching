// Card Game Functions
const cardContainerInt = document.querySelector(".card-container-2");
const timerInt = document.querySelector('.timerInt');
const resetIntBtn = document.querySelector('#resetInt');

let timerIntervalInt;
let cardsInt = [];
let matched = 0;
let firstCardInt, secondCardInt;
let lockBoard = false;
let gameStartedInt = false;
let timeLeftInt = 25;

// Imports
import { initModals } from "./modals.js";
const { showTimeUpModal, showWinModal } = initModals();

fetch("./data/combat.json")
    .then((res) => res.json())
    .then((data) => {
        cardsInt = [...data, ...data];
        shuffleCards();
        generateCards();
    });

function shuffleCards() {
    let currentIndex = cardsInt.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cardsInt[currentIndex]
        cardsInt[currentIndex] = cardsInt[randomIndex]
        cardsInt[randomIndex] = temporaryValue
    }
}

function generateCards() {
    for (let card of cardsInt) {
        const cardElement = document.createElement("div")
        cardElement.classList.add("memory-card", "flex")
        cardElement.setAttribute("data-name", card.name)
        cardElement.innerHTML = `
            <div class="front-face">
                <img class="front-image" src="${card.image}" alt="${card.name}"/>
            </div>
            <div class="back-face"></div>
        `;
        cardContainerInt.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard)
    }
}

// Starts game and timer
function startTimer() {
	if (!gameStartedInt) {
		gameStartedInt = true;
		// updateTimer(); // to start timer immediately
		timerInt.textContent = timeLeftInt;
		timerIntervalInt = setInterval(updateTimer, 1000);
	}
}


//Flips a card and keeps it flipped
function flipCard() {
	startTimer();
	if (lockBoard) return;
	if (this === firstCardInt) return;
	this.classList.add('flip');

	if (!firstCardInt) {
		firstCardInt = this;
		return;
	}

	secondCardInt = this;
	lockBoard = true;

	checkForMatch();
}

//Keep Int flipped (when matched)
function disableCards() {
	firstCardInt.removeEventListener('click', flipCard);
	secondCardInt.removeEventListener('click', flipCard);

	matched++;
	resetBoard();

	// Alert if all cards art matched
	if (hasWon()) {
		clearInterval(timerIntervalInt);
		setTimeout(() => {
			showWinModal();
			window.currentRestart = restart;
		}, 500)
	}
}

//Unflip cards (when not matched)
function unflipCards() {
	setTimeout(() => {
		firstCardInt.classList.remove('flip');
		secondCardInt.classList.remove('flip');
		resetBoard();
	}, 700);
}

// Return win condition
function hasWon() {
	return matched === cardsInt.length / 2;
}

// Reset cards on board
function resetBoard() {
	firstCardInt = null;
	secondCardInt = null;
	lockBoard = false;
}

// Checks if selected cards are a match
function checkForMatch() {
	let isMatch = firstCardInt.dataset.name === secondCardInt.dataset.name;

	isMatch ? disableCards() : unflipCards();
}

// Countdown timer
function updateTimer() {

	if (timeLeftInt > 0) {
			timeLeftInt--
			timerInt.textContent = timeLeftInt;

			// Change color of text based on time left
			if (timeLeftInt <= 7) {
				timerInt.style.color = 'red';
			} else if (timeLeftInt <= 17) {
				timerInt.style.color = 'orange';
			} else {
				timerInt.style.color = '#233C58';
			}

		} else if (timeLeftInt === 0) {
			// If time runs out
			clearInterval(timerIntervalInt);
			showTimeUpModal();
			window.currentRestart = restart;
		}
}

// Restart Button and Function
resetIntBtn.addEventListener('click', restart);
function restart() {
	clearInterval(timerIntervalInt);
	timeLeftInt = 25;
	timerInt.textContent = timeLeftInt;
	timerInt.style.color = '#233C58';
	matched = 0;
	firstCardInt = null;
	secondCardInt = null;
	resetBoard();
	shuffleCards();
	cardContainerInt.innerHTML = '';
	gameStartedInt = false;
	generateCards();
}

window.currentRestart = restart;