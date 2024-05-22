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
let timeLeft = 20;

// //Make board unclickable
// cardContainerEasy.classList.add('unclickable')

// // Hide 'Reset' Button
// resetEasyBtn.classList.add('hide');

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

	resetBoard();
}

//Unflip cards (when not matched)
function unflipCards() {
	setTimeout(() => {
		firstCardEasy.classList.remove('flip');
		secondCardEasy.classList.remove('flip');
		resetBoard();
	}, 1000);
}

// Return win condition
function hasWon() {
	if (matched === cards.length / 2) {
		return true;
	} else {
		return false;
	}
}

// Sets currently open cards to the match state, checks win condition
// var setMatch = function () {
// 	// cards.forEach(function (card) {
// 	//     card.addClass("match");
// 	// });
// 	cards = [];
// 	matched += 2;

// 	if (hasWon()) {
// 		clearInterval(time.clearTime);
// 		// showModal();
// 		alert('You won!');
// 	}
// };

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

	// if (isMatch) {
	// 	if (matched === cards.length / 2) {
	// 		clearInterval(timerInterval);
	// 		alert("You win!");
	// 	}
	// }
}

// Timer
function updateTimer() {
	timerEasy.textContent = timeLeft;

	// Alert pops up when timer shows 0
	setTimeout(function() {
		if (timeLeft > 0) {
			timeLeft--;
		} else {
			clearInterval(timerInterval);
			alert("Time is up!");
		}
	}, 1000)

	// if (timeLeft > 0) {
	// 	timeLeft--;
	// } else if (timeLeft === 0) {
	// 	clearInterval(timerInterval);
	// 	alert("Time is up!");
	// }
}

// Restart Button and Function
resetEasyBtn.addEventListener('click', restart);
function restart() {
	clearInterval(timerInterval);
	timeLeft = 20;
	timerEasy.textContent = timeLeft;
	firstCardEasy = null;
	secondCardEasy = null;
	resetBoard();
	shuffleCards();
	cardContainerEasy.innerHTML = '';
	gameStarted = false;
	generateCards();
	// startBtn.classList.remove('hide')
	// resetEasyBtn.classList.add('hide')
}
