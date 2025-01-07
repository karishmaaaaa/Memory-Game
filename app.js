const gameContainer = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let cards = [];
let flippedCards = [];
let moves = 0;
let isLocked = false;

const cardValues = ['🐶', '🐼', '🐨', '🐱', '🐷', '🐵', '🐰', '🐹',
                   '🐶', '🐼', '🐨', '🐱', '🐷', '🐵', '🐰', '🐹'];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-front">?</div>
        <div class="card-back">${value}</div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function initializeGame() {
    const shuffledValues = shuffle([...cardValues]);
    gameContainer.innerHTML = '';
    cards = shuffledValues.map(value => createCard(value));
    cards.forEach(card => gameContainer.appendChild(card));
    moves = 0;
    scoreDisplay.textContent = `Moves: ${moves}`;
}

function flipCard() {
    if (isLocked) return;
    if (this.classList.contains('flipped')) return;
    if (flippedCards.length === 2) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        scoreDisplay.textContent = `Moves: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.card-back').textContent;
    const value2 = card2.querySelector('.card-back').textContent;

    if (value1 === value2) {
        flippedCards = [];
    } else {
        isLocked = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

function resetGame() {
    initializeGame();
}

initializeGame();