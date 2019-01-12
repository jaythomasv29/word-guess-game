// 1. Click on key, if valid it will pass to letterGuesser
// 2. Letter guess logic if correct then it will add to DOM. If Incorrect letter is passed to checkIncorrect
// 3. Letter passed to checkIncorrect
// 4.

// variables reference to DOM Elements


var $newGameButton = document.querySelector("#new-game-btn");
var $placeholders = document.querySelector("#placeholders");
var $guessedLetters = document.querySelector("#guessed-letters");
var $guessesLeft = document.querySelector("#guesses-left");
var $wins = document.querySelector("#wins");
var $losses = document.querySelector("#losses");

// Game variables word list, wins, losses, picked letters, guesses, game running, picked word placeholder, guessed letter bank, incorrect letter bank
//array words
var wordList = ['Tacos', 'Fried Rice', 'Wasabi', 'Noodles', 'Cheesecake', 'Pasta', 'Gumbo', 'Sashimi', 'Pancake'];
var wins = 0; //initial
var losses = 0; //initial
var guessesLeft = 8; //initial
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = []; //initial empty array until .push()
var guessedLetterBank = []; //initial empty array until .push()
var incorrectLetterBank = []; //initial empty array until .push()
// newGame function to reset , picks new word and placeholder
function newGame() {

    //Reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    //Pick a new word from wordList
    pickedWord = wordList[Math.floor(Math.random() * wordList.length)];

    //Create placeholders out of new pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ')
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    //Write new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;

}

//create letterGuesser checked letter picked onkeyup
function letterGuesser(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // if true and returns -1
        //Run game logic
        //push to guessed letter bank
        guessedLetterBank.push(letter);

        //Check if guessed letter is in picked word

        for (var i = 0; i < pickedWord.length; i++) {
            // Convert to lowerCase for check
            if (pickedWord[i].toLowerCase() == letter.toLowerCase()) {
                //If match, reassign letter with actual letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);
    } else {
        if (!gameRunning) {
            alert(`Game isn't running, click on "Start Hangman Dogo"`);
        } else {
            alert(`You've already guessed this letter, try another one`);
        }
    }
}
// check incorrect letter
function checkIncorrect(letter) {
    //check if letter converted to lowercase or uppercase exists in pickedWordPlaceholderArr
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
        pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        //deincrement guessesLeft
        guessesLeft--;
        //add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);

        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        //add to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}
// checkLoss
function checkLoss() {
    if (guessesLeft === 0) {
        alert("You have lost the game. Start a new game.");
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
    }
}
//checkWin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}
//Add event listeners for newGameBtn
$newGameButton.addEventListener('click', newGame); //executes new game function

//Event Listener for letter buttons on screen
//------------Add Event Listner to Buttons--------//
 
for (var i = 0; i < 26; i++) {
    var butt = document.querySelectorAll("button");
    butt[i].addEventListener("onmouseup", letterGuesser);
    butt[i].addEventListener("onclick", letterGuesser);
}

document.onclick = function(event) {
    letterGuesser(event.click);
}

// onkeyup event to trigger letterGuess
document.onkeyup = function(event) {
    //letters between a and z only
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        //then run function if between a - z
        letterGuesser(event.key);
    }
}