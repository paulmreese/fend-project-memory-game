/*
 * Create a list that holds all of your cards
 */
let listOfOpen = [];
let moveCount = 0;
let firstFlip = "";
let secondFlip = "";
let isComparing = false;
let cardArray = [];
const board = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
function initializePage() {
  cards.forEach(function(card) {
    card.classList.remove("open", "show", "match");
  });
  getMoveCount();
  shuffleCards();
}

function shuffleCards() {
  cardArray = [].slice.call(cards);;
  const newCards = shuffle(cardArray);
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  cardArray.forEach(function(obj) {
    board.innerHTML += '<li class="card">' + obj.innerHTML + '</li>';
  });
}

function getMoveCount() {
  document.querySelector('.moves').innerText = moveCount;
}

function displayCard(e) {
  e.target.classList.toggle("open");
  e.target.classList.toggle("show");
}

function addToOpenList(e) {
  listOfOpen += e.target.querySelector('i').className;
}

function checkForMatch(e) {
  if (e.target.querySelector('i').className == listOfOpen) {
    document.querySelectorAll('.show').forEach(function(card) {
      card.classList.add("match");
      card.classList.remove("show");
      checkVictory();
    });
  } else {
    isComparing = true;
    setTimeout(function() {
      firstFlip.classList.remove("show");
      firstFlip.classList.remove("open");
      secondFlip.classList.remove("show");
      secondFlip.classList.remove("open");
      firstFlip, secondFlip = "";
      isComparing = false;
    }, 1000);
  }
}

function adjustRating() {
  const oneStar = document.querySelector(".fa-star").parentNode;
  if (moveCount == 28) {
    oneStar.parentNode.removeChild(oneStar);
  } else if (moveCount == 38) {
    oneStar.parentNode.removeChild(oneStar);
  }
}

function checkVictory() {
  if (document.querySelectorAll(".match").length == 16) {
    setTimeout(function() {
      alert("Congratulations!!\nYou finished in " + moveCount + " moves!\n" +
      "That's a " + document.querySelector(".stars").getElementsByTagName("li").length + "-Star Win!\n");
    }, 0);
  }
}

document.querySelector('.deck').addEventListener("click", function(e) {
  if (!isComparing && !e.target.classList.contains("cards")) {
    if (e.target.classList.contains("card") && !e.target.classList.contains("open")) {
      displayCard(e);
      moveCount++;
      getMoveCount();
      adjustRating();
      if (listOfOpen.length == 0) {
        addToOpenList(e);
        firstFlip = e.target;
      } else {
        secondFlip = e.target;
        checkForMatch(e);
        listOfOpen = [];
      }
    }
  }
});

initializePage();
