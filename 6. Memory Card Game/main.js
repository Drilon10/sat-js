const gameBoard = document.getElementById('gameBoard');
const moveCountEl = document.getElementById('moveCount');
const pairsFoundEl = document.getElementById('pairsFound');
const timerEl = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const winModal = document.getElementById('winModal');
const finalMovesEl = document.getElementById('finalMoves');
const finalTimeEl = document.getElementById('finalTime');
const playAgainBtn = document.getElementById('playAgain');

const emojis = ['🐶', '😺', '🐺', '🦁', '🦊', '🐰', '🐼', '🫎'];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;
let timerInterval = null;
let secondsElapsed = 0;
let gameStarted = false;
let lockBoard = false;

function initGame() {
    flippedCards = [];
    matchedPairs = 0;
    moveCount = 0;
    secondsElapsed = 0;
    gameStarted = false;
    lockBoard = false;

    clearInterval(timerInterval);

    moveCountEl.textContent = '0';
    pairsFoundEl.textContent = '0';
    timerEl.textContent = "00:00";

    winModal.classList.add('hidden');

    cards = shuffle([...emojis, ...emojis]);

    renderBoard();
}

function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


function renderBoard() {
    gameBoard.innerHTML = '';

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card-item';

        card.dataset.emoji = emoji;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${emoji}</div>
                <div class="card-back">?</div>
            </div>
        `;

        card.addEventListener('click', () => handleCardClick(card));

        gameBoard.appendChild(card);
    });
}

function handleCardClick(card) {
    if(lockBoard) return;

    if(card.classList.contains('flipped')) return;

    if(card.classList.contains('matched')) return;

    if(!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    card.classList.add('flipped');

    flippedCards.push(card);

    if(flippedCards.length === 2) {
        moveCount++;
        moveCountEl.textContent = moveCount;

        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.dataset.emoji;
    const emoji2 = card2.dataset.emoji;

    if(emoji1 === emoji2) {
        handleMatch(card1, card2);
    }

    else {
        handleMismatch(card1, card2);
    }
}

function handleMatch(card1, card2) {
    card1.classList.add('matched');
    card2.classList.add('matched');

    matchedPairs++;
    pairsFoundEl.textContent = matchedPairs;

    flippedCards = [];
    if(matchedPairs === emojis.length) {
        setTimeout(() => {
            endGame();
        }, 600)
    }
}

function handleMismatch(card1, card2) {
    lockBoard = true;

    setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');

        flippedCards = [];

        lockBoard = false;
    }, 800)
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;

        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;

        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000)
}

function endGame() {
    clearInterval(timerInterval);

    finalMovesEl.textContent = moveCount;
    finalTimeEl.textContent = timerEl.textContent;

    winModal.classList.remove('hidden');
}

restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);


initGame();