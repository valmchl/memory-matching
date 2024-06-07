
// Card Game Functions
const cardContainerHard = document.querySelector(".card-container-3");
const timerHard = document.querySelector('.timerHard');
const resetHardBtn = document.querySelector('#resetHard');

let timerIntervalHard;
let cardsHard = [];
let matched = 0;
let firstCardHard, secondCardHard;
let lockBoard = false;
let gameStartedHard = false;
let timeLeftHard = 45;

// Imports
import { initModals } from "./modals.js"; //import modals
const { showTimeUpModal, showWinModal } = initModals();

import { soundEffects } from "./sound-effects.js"; //import SFX
const { buzzer, chord, pop, swipe, swoop, twinkle, warning } = soundEffects();

fetch("./data/characters.json")
    .then((res) => res.json())
    .then((data) => {
        cardsHard = [...data, ...data];
        shuffleCards();
        generateCards();
    });

function shuffleCards() {
    let currentIndex = cardsHard.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cardsHard[currentIndex]
        cardsHard[currentIndex] = cardsHard[randomIndex]
        cardsHard[randomIndex] = temporaryValue
    }
}

function generateCards() {
    for (let card of cardsHard) {
        const cardElement = document.createElement("div")
        cardElement.classList.add("memory-card", "flex")
        cardElement.setAttribute("data-name", card.name)
        cardElement.innerHTML = `
            <div class="front-face">
                <img class="front-image" src="${card.image}" alt="${card.name}"/>
            </div>
            <div class="back-face"></div>
        `;
        cardContainerHard.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard)
    }
}

// Format time as mm:ss
// function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2)}:${String(remainingSeconds).padStart(2, '0')}`;
// }
// timerHard.textContent = formatTime(timeLeftHard)

// Starts game and timer
function startTimer() {
	if (!gameStartedHard) {
		gameStartedHard = true;
		timerHard.textContent = timeLeftHard;
		timerIntervalHard = setInterval(updateTimer, 1000);
	}
}


//Flips a card and keeps it flipped
function flipCard() {
	startTimer();
	swipe();

	if (lockBoard) return;
	if (this === firstCardHard) return;
	this.classList.add('flip');

	if (!firstCardHard) {
		firstCardHard = this;
		return;
	}

	secondCardHard = this;
	lockBoard = true;

	checkForMatch();
}

//Keep cards flipped (when matched)
function disableCards() {
	firstCardHard.removeEventListener('click', flipCard);
	secondCardHard.removeEventListener('click', flipCard);

	matched++;
	resetBoard();

	// Alert if all cards are matched
	if (hasWon()) {
		clearInterval(timerIntervalHard);
		setTimeout(() => {
			chord();
			showWinModal();
			window.currentRestart = restart;
		}, 500)
	}
}

//Unflip cards (when not matched)
function unflipCards() {
	setTimeout(() => {
		firstCardHard.classList.remove('flip');
		secondCardHard.classList.remove('flip');
		swoop();
		resetBoard();
	}, 700);
}

// Return win condition
function hasWon() {
	return matched === cardsHard.length / 2;
}

// Reset cards on board
function resetBoard() {
	firstCardHard = null;
	secondCardHard = null;
	lockBoard = false;
}

// Checks if selected cards are a match
function checkForMatch() {
	let isMatch = firstCardHard.dataset.name === secondCardHard.dataset.name;

	if (isMatch) {
		disableCards()
		twinkle();
	} else {
		unflipCards()
	}
}

// Countdown timer
function updateTimer() {

	if (timeLeftHard > 0) {
		timeLeftHard--
		timerHard.textContent = timeLeftHard;

		// Change color of text based on time left
		if (timeLeftHard <= 15) {
			warning();
			timerHard.style.color = 'red';
		} else if (timeLeftHard <= 30) {
			timerHard.style.color = 'orange';
		} else {
			timerHard.style.color = '#233C58';
		}

	} else if (timeLeftHard === 0) {
		// If time runs out
		buzzer();
		clearInterval(timerIntervalHard);
		showTimeUpModal();
		window.currentRestart = restart;
	}
}

// Restart Button and Function
resetHardBtn.addEventListener('click', restart);
function restart() {
	pop();
	clearInterval(timerIntervalHard);
	timeLeftHard = 45;
	timerHard.textContent = timeLeftHard;
	timerHard.style.color = '#233C58';
	matched = 0;
	firstCardHard = null;
	secondCardHard = null;
	resetBoard();
	shuffleCards();
	cardContainerHard.innerHTML = '';
	gameStartedHard = false;
	generateCards();
}

window.currentRestart = restart;