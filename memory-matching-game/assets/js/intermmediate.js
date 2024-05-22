// Card Game Functions
const cardContainerInter = document.querySelector(".card-container-2");
const resetInterBtn = document.querySelector('#resetInter');

let cards = [];
let firstCardInter, secondCardInter;
let lockBoard = false;
let timeClock1 = 0;

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

function flipCard() {
    if (lockBoard) return;
    if (this === firstCardInter) return;

    this.classList.add("flip");

    if (!firstCardInter) {
        firstCardInter = this;
        return;
    }

    secondCardInter = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCardInter.dataset.name === secondCardInter.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCardInter.removeEventListener("click", flipCard)
    secondCardInter.removeEventListener("click", flipCard)

    resetBoard()
}

function unflipCards() {
    setTimeout(() => {
        firstCardInter.classList.remove('flip');
        secondCardInter.classList.remove('flip');
        resetBoard();
    }, 1000);
}

//Reset Cards on Board
function resetBoard() {
    firstCardInter = null;
    secondCardInter = null;
    lockBoard = false;
}

// Restart Button and Function
resetInterBtn.addEventListener("click", restart)
function restart() {
    resetBoard();
    shuffleCards();
    cardContainerInter.innerHTML = "";
    generateCards();
}