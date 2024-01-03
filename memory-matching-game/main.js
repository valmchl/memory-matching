
// Toggle Game Difficulty
window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');

    // toggle game page when difficulty is clicked
    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        // toggle text color for current difficulty level when clicked
        tab_switcher.addEventListener('click', () => {
            document.querySelector('.options .level.current-level').classList.remove('current-level');
            tab_switcher.parentNode.classList.add('current-level');

            SwitchPage(page_id);
        });
    }
}

// toggle game page
function SwitchPage(page_id) {
    console.log(page_id);
    const current_page = document.querySelector('.game-container .memory-game.is-active');
    current_page.classList.remove('is-active');

    const next_page = document.querySelector(`.game-container .memory-game[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
}



// Define the API URL
const apiUrl = 'https://genshin-db-api.vercel.app/api/characters?query=';
const outputClass = document.querySelector('.image-test-container')

// Make a GET request
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const name = data.name;
        const characterImg = data.images.cover1
        outputClass.innerHTML = `<img src="${characterImg}" />`
        console.log(characters)
    })
    .catch(error => {
        console.error('Error:', error);
    });
// "type": "module",
//GenshinDB API URL: https://genshin-db-api.vercel.app/api/characters?query=klee


// Card Game Functions
const cardContainer = document.querySelector(".card-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let timeClock1 = 0;

fetch("./data/archons.json")
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
        cardElement.classList.add("memory-card", "flex", "flip")
        cardElement.setAttribute("data-name", card.name)
        cardElement.innerHTML = `
            <img class="front-face" src="${card.image}" alt="">
            <div class="back-face"></div>
        `;
        cardContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard)
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
}


// Matching Card Game
// const cards = document.querySelectorAll('.memory-card');

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//     if (lockBoard) return;
//     if (this === firstCard) return;

//     this.classList.add('flip');

//     if (!hasFlippedCard) {
//         hasFlippedCard = true;
//         firstCard = this;

//         return;
//     }

//     secondCard = this;
//     checkForMatch();
// }

// function checkForMatch() {
//     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

//     isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeEventListener('click', flipCard);

//     resetBoard();
// }

// function unflipCards() {
//     lockBoard = true;

//     setTimeout(() => {
//         firstCard.classList.remove('flip');
//         secondCard.classList.remove('flip');
//         resetBoard();
//     }, 1000);
// }

// function resetBoard() {
//     [hasFlippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
// }

// (function shuffle() {
//     cards.forEach(card => {
//         let randomPos = Math.floor(Math.random() * 12);
//         card.style.order = randomPos;
//     });
// })();

// cards.forEach(card => card.addEventListener('click', flipCard));