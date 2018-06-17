//Global Variables
let listOfOpen = []; //List of "open" cards
let moveCount = 0; //Number of moves taken
let firstFlip = ""; //The first card flipped in a pair
let secondFlip = ""; //The second card flipped
let isComparing = false; //Shows true when two cards are face-up and don't match
let cardArray = []; //Array list for node list. Needed for shuffle function

//Elements
const board = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector(".restart");

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

//Function Definitions

/* Sets up the game board by setting the move count on page and hiding
 * the cards symbols. It then shuffles the board.
 */
function initializePage() {
  getMoveCount();
  cards.forEach(function(card) {
    card.classList.remove("open", "show", "match");
  });
  shuffleCards();
}

//Shuffles the cards and displays them
function shuffleCards() {
  cardArray = [].slice.call(cards);;
  const newCards = shuffle(cardArray);
  //As long as there is a card, remove it
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  cardArray.forEach(function(obj) {
    board.innerHTML += '<li class="card">' + obj.innerHTML + '</li>';
  });
}

//Sets the move count display
function getMoveCount() {
  document.querySelector(".moves").innerText = moveCount;
}

//"flips" a card
function displayCard(e) {
  e.target.classList.toggle("open");
  e.target.classList.toggle("show");
}

//saves the fa symbol from the card to check later
function addToOpenList(e) {
  listOfOpen += e.target.querySelector("i").className;
}

//checks the most recently clicked card against the last card
function checkForMatch(e) {
  if (e.target.querySelector("i").className == listOfOpen) {
    document.querySelectorAll(".show").forEach(function(card) {
      card.classList.add("match");
      card.classList.remove("show");
      checkVictory();
    });
  } else {
    //Set to true so that click event listeners won't fire
    isComparing = true;
    //This allows the user time to look at the cards
    setTimeout(function() {
      firstFlip.classList.remove("show");
      firstFlip.classList.remove("open");
      secondFlip.classList.remove("show");
      secondFlip.classList.remove("open");
      firstFlip, secondFlip = "";
      //Allow clicks
      isComparing = false;
    }, 1000);
  }
}

//Adjusts the star rating
function adjustRating() {
  const oneStar = document.querySelector(".fa-star").parentNode;
  if (moveCount == 28) {
    oneStar.parentNode.removeChild(oneStar);
  } else if (moveCount == 38) {
    oneStar.parentNode.removeChild(oneStar);
  }
}

//Checks to see if all cards have been matched
function checkVictory() {
  if (document.querySelectorAll(".match").length == 16) {
    setTimeout(function() {
      alert("Congratulations!!\nYou finished in " + moveCount + " moves!\n" +
      "That's a " + document.querySelector(".stars").getElementsByTagName("li").length + "-Star Win!\n");
    }, 0);
  }
}

//functionality for reset button
function resetCards() {
  moveCount = 0;
  getMoveCount();
  cards.forEach(function(card) {
    card.classList.remove("open", "show", "match");
  });
  shuffleCards();
}

//Event Listeners
board.addEventListener("click", function(e) {
  /* if statements nested for readability
   * First statements make sure no previous pair is being displayed, then
   * ensures that the click wasn't on the board itself.
   */
  if (!isComparing && !e.target.classList.contains("cards")) {
    /* Next statments make sure that we are clicking the card(not its symbol),
     * and that the card is not open.
     */
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

resetButton.addEventListener("click", function(){
  resetCards();
});

//Function Call
initializePage();
