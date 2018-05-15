const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves-number");
const resetButton = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const arrow = document.querySelector(".arrow");
const playAgainButton = document.querySelector(".play-again");
const modalStats = document.querySelector(".stats");
const starList = document.querySelector(".stars");
const timerDisplay = document.querySelector(".timer-count");

/*
 * Create a list that holds all of your cards
 */

const cards = ['fa-gem', 'fa-gem', 'fa-paper-plane', 'fa-paper-plane', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb' ]

let openCards = [];
let numberOfMatches = 0;
let numberOfStars = 3;
let timer = 0;
let myTimer = null;

/*st
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame(array) {
  const shuffledArray = shuffle(array);
  myTimer = setInterval(startTimer, 1000); //setInterval info from https://www.w3schools.com/jsref/met_win_setinterval.asp
  createCards(array);
}

function startTimer() {
  timerDisplay.innerHTML = ++timer;
}

 function createCards(array) {
   for (const item of array) {
     let cardHTML = document.createElement("li");
     cardHTML.setAttribute("class", "card");
     cardHTML.innerHTML = `<i class="far fas ${item}"></i>`;
     deck.appendChild(cardHTML);
   }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



function flipCard(e) {
  let currentCard = e.target;
  if (e.target.nodeName === "LI" && !e.target.classList.contains("show") && !e.target.classList.contains("match") && openCards.length < 2) {
    e.target.classList.add("open");
    e.target.classList.add("show");
    addCardToArray(e.target);
  }
}

function addCardToArray(card) {
  openCards.push(card);
  if (openCards.length === 2) {
    compareCards(openCards);
  }
}

function compareCards(array) {
  const card1 = array[0];
  const card2 = array[1];
  if (card1.innerHTML === card2.innerHTML) {
    lockCards();
  } else {
    card1.classList.add("wrong", "animated", "shake");
    card2.classList.add("wrong", "animated", "shake");
    setTimeout(hideCards, 500);
  }
}

function lockCards() {
  openCards[0].classList.add("match", "animated", "rubberBand");
  openCards[1].classList.add("match", "animated", "rubberBand");
  openCards = [];
  numberOfMatches += 1;
  incrementMoves();
}

function hideCards() {
  openCards[0].classList.remove("wrong", "show", "open", "animated", "shake");
  openCards[1].classList.remove("wrong", "show", "open", "animated", "shake");
  openCards = [];
  incrementMoves();
}

function incrementMoves() {
  let currentNumber = Number(moves.innerText); //Number function from https://www.w3schools.com/jsref/jsref_number.asp
  moves.innerText = currentNumber += 1;
  setStars(currentNumber);
  checkForWin(currentNumber);
}

function setStars(number) {
  if (number >= 30) {
    starList.innerHTML = "<li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></li>";
    numberOfStars = 0;
  } else if (number >= 20) {
    starList.innerHTML = "<li><i class='fas fa-star'></i></li><li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></li>";
    numberOfStars = 1;
  } else if (number >= 10) {
    starList.innerHTML = "<li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></li><li><i class='far fa-star'></i></li>";
    numberOfStars = 2;
  }
}

function checkForWin(numberOfMoves) {
  if (numberOfMatches === 8) {
    const modalMessage = document.createElement("p");
    clearInterval(myTimer);
    modal.setAttribute("style", "display: initial");
    modal.classList.add("animated", "fadeIn");
    arrow.classList.add("animated", "rotateIn");
    modalMessage.innerHTML = `With ${numberOfMoves} moves in ${timer} seconds and ${numberOfStars} stars!!!`;
    modalStats.appendChild(modalMessage);
  }
}

function resetGame() {
  modal.setAttribute("style", "display: hidden");
  timer = 0;
  timerDisplay.innerHTML = 0;
  clearInterval(myTimer);
  deck.innerHTML = "";
  modalStats.innerHTML = "";
  numberOfMatches = 0;
  moves.innerText = 0;
  openCards = [];
  numberOfStars = 3;
  starList.innerHTML = "<li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></li>";
  startGame(cards);
}

startGame(cards);

deck.addEventListener("click", flipCard);
resetButton.addEventListener("click", resetGame);
playAgainButton.addEventListener("click", resetGame);
