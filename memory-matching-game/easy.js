// Card Game Functions
const cardContainer = document.querySelector(".card-container-1");
const easyGame = document.querySelector("#easy");
let cards = [];
let matched = 0;
let firstCard, secondCard;
let lockBoard = false;
let clockEasy = document.querySelector(".clockEasy");
let timerEasy;
let timeLeft = {
    seconds: 20,
    minutes: 0,
    clearTime: -1
};
let interval;
let startBtn = document.querySelector(".start-btn")


// Fetch archon card data from JSON
fetch("./data/archons.json")
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
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
}

//Generate cards on game board
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
        cardContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard)
    }
}

//Start timer
function gameOver() {
    clearInterval(timerEasy);
    alert('Time is up!');
    startBtn.classList.add('show')

}

function updateTimer() {
    timeLeft.seconds--
    if (timeLeft.seconds >= 0) {
        clockEasy.innerHTML = `0:${timeLeft.seconds}`;
    } else {
        gameOver();
    }
}
function start() {
    timerEasy = setInterval(updateTimer, 1000);
    updateTimer();
    startBtn.classList.add('hide')
}

startBtn.addEventListener('click', () => {
    start();
})

//Flips a card and keeps it flipped
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

//Checks if selected cards are a match
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

//Keep cards flipped (when matched)
function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard()
}

//Unflip cards (when not matched)
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Return win condition
function hasWon() {
    if (matched === 4) {
        clearInterval(timerEasy);
        alert('You won!')
        return true;
    } else {
        return false;
    }
}

// Sets currently open cards to the match state, checks win condition
var setMatch = function () {
    // cards.forEach(function (card) {
    //     card.addClass("match");
    // });
    cards = [];
    matched += 2;

    if (hasWon()) {
        clearInterval(timeLeft.clearTime);
        // showModal();
    }
};

function resetTimer() {
    timeLeft.seconds = 20;
    timeLeft.minutes = 0;
    clockEasy.innerHTML = `0:20`;
    clearInterval(timerEasy)
    startBtn.classList.add('show')
}

//Reset Cards on Board
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Restart Button and Function
document.querySelector(".reset-btn").addEventListener("click", restart)
function restart() {
    resetBoard();
    shuffleCards();
    cardContainer.innerHTML = "";
    generateCards();
    resetTimer();
}