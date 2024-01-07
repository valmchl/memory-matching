// Card Game Functions
const cardContainer = document.querySelector(".card-container-3");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let timeClock1 = 0;

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
        cardContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard)
    }
}

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

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard()
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
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
}