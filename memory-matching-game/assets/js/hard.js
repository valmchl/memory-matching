// Card Game Functions
const cardContainerHard = document.querySelector(".card-container-3");
const timerHard = document.querySelector('.timerHard');
const resetHardBtn = document.querySelector('#resetHard');

let timerInterval;
let cards = [];
let matched = 0;
let firstCardHard, secondCardHard;
let lockBoard = false;
let gameStarted = false;
let timeLeft = 60;

fetch("./data/characters.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
}

function generateCards() {
    for (let card of cards) {
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
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2)}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Starts game and timer
function startTimer() {
	if (!gameStarted) {
		gameStarted = true;
		// updateTimer(); // to start timer immediately
		timerHard.textContent = formatTime(timeLeft);
		timerInterval = setInterval(updateTimer, 1000);
	}
}


//Flips a card and keeps it flipped
function flipCard() {
	startTimer();
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

	if (hasWon()) {
		setTimeout(() => {
			alert("Congrats! You matched all cards!");
			restart();
		}, 500)
	}
}

//Unflip cards (when not matched)
function unflipCards() {
	setTimeout(() => {
		firstCardHard.classList.remove('flip');
		secondCardHard.classList.remove('flip');
		resetBoard();
	}, 700);
}

// Return win condition
function hasWon() {
	return matched === cards.length / 2;
}

//Reset Cards on Board
function resetBoard() {
	firstCardHard = null;
	secondCardHard = null;
	lockBoard = false;
}

//Checks if selected cards are a match
function checkForMatch() {
	let isMatch = firstCardHard.dataset.name === secondCardHard.dataset.name;

	isMatch ? disableCards() : unflipCards();
}

// Timer
function updateTimer() {

	if (timeLeft > 0) {
			timeLeft--
			timerHard.textContent = formatTime(timeLeft);

			if (timeLeft <= 30) {
			timerHard.style.color = 'red';
			} else if (timeLeft <= 10) {
				timerHard.style.color = 'orange';
			} else {
				timerHard.style.color = '#233C58';
			}

		} else if (timeLeft === 0) {
			clearInterval(timerInterval);
			alert("Time is up!");
			restart();
		}
}

// Restart Button and Function
resetHardBtn.addEventListener('click', restart);
function restart() {
	clearInterval(timerInterval);
	timeLeft = 80;
	timerHard.textContent = formatTime(timeLeft);
	timerHard.style.color = '#233C58';
	matched = 0;
	firstCardHard = null;
	secondCardHard = null;
	resetBoard();
	shuffleCards();
	cardContainerHard.innerHTML = '';
	gameStarted = false;
	generateCards();
}