// Card Game Functions
const cardContainerInter = document.querySelector(".card-container-2");
const timerInt = document.querySelector('.timerInt');
const resetIntBtn = document.querySelector('#resetInt');

let timerInterval;
let cards = [];
let matched = 0;
let firstCardInter, secondCardInter;
let lockBoard = false;
let gameStarted = false;
let timeLeft = 35;

fetch("./data/combat.json")
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
        cardContainerInter.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

// Starts game and timer
function startTimer() {
	if (!gameStarted) {
		gameStarted = true;
		// updateTimer(); // to start timer immediately
		timerInt.textContent = timeLeft;
		timerInterval = setInterval(updateTimer, 1000);
	}
}


//Flips a card and keeps it flipped
function flipCard() {
	startTimer();
	if (lockBoard) return;
	if (this === firstCardInter) return;
	this.classList.add('flip');

	if (!firstCardInter) {
		firstCardInter = this;
		return;
	}

	secondCardInter = this;
	lockBoard = true;

	checkForMatch();
}

//Keep cards flipped (when matched)
function disableCards() {
	firstCardInter.removeEventListener('click', flipCard);
	secondCardInter.removeEventListener('click', flipCard);

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
		firstCardInter.classList.remove('flip');
		secondCardInter.classList.remove('flip');
		resetBoard();
	}, 700);
}

// Return win condition
function hasWon() {
	return matched === cards.length / 2;
}

//Reset Cards on Board
function resetBoard() {
	firstCardInter = null;
	secondCardInter = null;
	lockBoard = false;
}

//Checks if selected cards are a match
function checkForMatch() {
	let isMatch = firstCardInter.dataset.name === secondCardInter.dataset.name;

	isMatch ? disableCards() : unflipCards();
}

// Timer
function updateTimer() {

	if (timeLeft > 0) {
			timeLeft--
			timerInt.textContent = timeLeft;

			if (timeLeft <= 27) {
			timerInt.style.color = 'red';
			} else if (timeLeft <= 14) {
				timerInt.style.color = 'orange';
			} else {
				timerInt.style.color = '#233C58';
			}

		} else if (timeLeft === 0) {
			clearInterval(timerInterval);
			alert("Time is up!");
			restart();
		}
}

// Restart Button and Function
resetIntBtn.addEventListener('click', restart);
function restart() {
	clearInterval(timerInterval);
	timeLeft = 35;
	timerInt.textContent = timeLeft;
	timerInt.style.color = '#233C58';
	matched = 0;
	firstCardInter = null;
	secondCardInter = null;
	resetBoard();
	shuffleCards();
	cardContainerInter.innerHTML = '';
	gameStarted = false;
	generateCards();
}