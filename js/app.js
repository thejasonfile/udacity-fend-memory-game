const deck = document.querySelector(".deck");

/*
 * Create a list that holds all of your cards
 */

const cards = [
  {
    icon: 'fa-diamond',
    state: ''
  },
  {
    icon: 'fa-diamond',
    state: ''
  },
  {
    icon: 'fa-paper-plane-o',
    state: ''
  },
  {
    icon: 'fa-paper-plane-o',
    state: ''
  },
  {
    icon: 'fa-anchor',
    state: ''
  },
  {
    icon: 'fa-anchor',
    state: ''
  },
  {
    icon: 'fa-bolt',
    state: ''
  },
  {
    icon: 'fa-bolt',
    state: ''
  },
  {
    icon: 'fa-cube',
    state: ''
  },
  {
    icon: 'fa-cube',
    state: ''
  },
  {
    icon: 'fa-leaf',
    state: ''
  },
  {
    icon: 'fa-leaf',
    state: ''
  },
  {
    icon: 'fa-bicycle',
    state: ''
  },
  {
    icon: 'fa-bicycle',
    state: ''
  },
  {
    icon: 'fa-bomb',
    state: ''
  },
  {
    icon: 'fa-bomb',
    state: ''
  }
]

const openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 const shuffledCards = shuffle(cards);

 function createCards(array) {
   for (const item of array) {
     let cardHTML = document.createElement("li");
     cardHTML.setAttribute("class", "card");
     cardHTML.innerHTML = `<i class="fa ${item.icon}"></i>`;
     deck.appendChild(cardHTML);
   }
 }

createCards(shuffledCards);

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

deck.addEventListener("click", flipCard);

function flipCard(e) {
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("open");
    e.target.classList.toggle("show");
  }
  compareCards(e.target);
}

function compareCards(card) {
  openCards.push(card);
  if (openCards.length === 2) {
    const card1 = openCards[0].innerHTML;
    const card2 = openCards[1].innerHTML;
    if (card1 === card2) {
      
    }
  }
}
