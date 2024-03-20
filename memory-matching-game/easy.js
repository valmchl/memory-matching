// Card Game Functions
const cardContainer = document.querySelector(".card-container-1")
const startBtn = document.querySelector(".start-btn")
const resetBtn = document.querySelector(".reset-btn")
const easyGame = document.querySelector("#easy")
const timerEasy = document.querySelector(".timerEasy")
let cards = [];
let matched = 0;
let firstCard, secondCard;
let lockBoard = false;
let time = {
    seconds: 15,
    minutes: 0,
    clearTime: -1
}

// //Make board unclickable
// cardContainer.classList.add('unclickable')

// // Hide 'Reset' Button
// resetBtn.classList.add('hide');

// Fetch archon card data from JSON
fetch("./data/archons.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        updateCards();
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
function updateCards() {
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
        cardElement.addEventListener('click', flipCard)
    }
}

//Start Timer

// displayTime(time.seconds)
// let countDownTimer = function () {

//     //Make gameboard clickable
//     cardContainer.classList.remove('unclickable')

//     // Toggle start button and reset button when timer is started
//     startBtn.classList.add('hide')
//     resetBtn.classList.remove('hide')

//     //Timer countdown
//     let timer = setInterval(() => {
//         time.seconds--;
//         displayTime(time.seconds)
//         if (time.seconds <= 0 || time.seconds < 1) {
//             clearInterval(timer)

//             //When time runs out, player is unable to click anymore cards
//             cardContainer.classList.add('unclickable')
//         }
//     }, 1000)

//     resetBtn.addEventListener('click', resetTimer)
// }

// //When start button is clicked, timer starts counting down
// startBtn.addEventListener('click', countDownTimer)

// //Display time clock
// function displayTime(second) {
//     const min = Math.floor(second / 60);
//     const sec = Math.floor(second % 60);
//     timerEasy.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
// }

// //Resets timer clock
// function resetTimer(timer) {
//     clearInterval(timer)
//     displayTime(time.seconds)
// }

//Flips a card and keeps it flipped
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

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
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

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
        clearInterval(time.clearTime);
        // showModal();
        alert('You won!');
    }
};

//Reset Cards on Board
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Restart Button and Function
resetBtn.addEventListener("click", restart)
function restart() {
    //resetTimer();
    resetBoard();
    shuffleCards();
    cardContainer.innerHTML = "";
    updateCards();
    // startBtn.classList.remove('hide')
    // resetBtn.classList.add('hide')
}