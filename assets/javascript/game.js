//Wins and losses counter
var wins = 0;
var losses = 0;

//The variables used to update the page based on the outcome/choices
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var wordGuessedText = document.getElementById("word-guessed-text");
var lettersGuessedText = document.getElementById("letters-guessed-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var lossCountText = document.getElementById("losses-text");
var winCountText = document.getElementById("wins-text");

//Went with the idea of the game being a function rather than an object.
var game = new wordGuess();


document.onkeyup = function (event) {

    var userGuess = event.key;
    //The following conditional checks if the game has eneded. If not, continue to allow the user to guess
    //If so, clear the page except for the wins/loss counters  
    if (!game.gameOver) {
        if (!game.lettersGuessed.includes(userGuess)) {
            game.checkGuess(userGuess);
        }

    } else {
        game = new wordGuess();
        game.updatePage();
    }
};

//This function initializes the game to pick the random word, set the empty string to guess
//To maintain the correct guesses, the wordFlag array is filled with zeros and updated on correct guesses
function wordGuess() {
    //scoping is used as the wordGuess function is based on the game function
    this.wordChoices = ["my", "first", "javascript", "game"]
    this.word = this.wordChoices[Math.floor(Math.random() * this.wordChoices.length)];
    this.answer = [];
    for (var i = 0; i < this.word.length; i++) {
        this.answer[i] = '_';
    }
    this.guessesRemaining = 10;
    this.lettersGuessed = [];
    this.gameOver = false;
    this.wordFlag = [];
    for (var i = 0; i < this.word.length; i++) {
        this.wordFlag[i] = 0;
    }

}

//CheckGuess takes in the guess input made by the user and checks if it is apart of the word
wordGuess.prototype.checkGuess = function (guess) {
    //Convert the letter to upper case and add to the letters guessed array
    this.lettersGuessed.push(guess.toUpperCase());
    //Flag that is used to check if the guessed letter is apart of the word
    var isInWord = 0;
    //Iterate through the word and check if the letter is at any of the indexes. If so, update the isInWord flag
    //Add the letter (uppercase) to the index of the answer array
    //Update the wordFlag array for 1 at the index
    for (var i = 0; i < this.word.length; i++) {
        if (this.word.charAt(i) === guess) {
            isInWord = 1;
            this.answer[i] = guess.toUpperCase();
            this.wordFlag[i] = 1;
        }
    }
    //Decrement the guess counter if the isInWord flag remains 0
    if (!isInWord == 1) {
        this.guessesRemaining--;
    }

    //Loss condition
    if (this.guessesRemaining == 0) {
        losses++;
        this.gameOver = true;
    }

    //Win condition. If the wordFlag array contains all 1s
    if (!this.wordFlag.includes(0)) {
        wins++;
        this.gameOver = true;
    }
    //To update the page with the updated values
    game.updatePage();
};

//Update page updates the HTML based on the inputs by the user, correct guesses and score
wordGuess.prototype.updatePage = function () {
    //Hide the directions
    directionsText.textContent = "";
    // Display the user and computer guesses, and wins/losses/ties.
    userChoiceText.textContent = "You chose: " + this.userGuess;
    //Displays the word currently being guessed
    wordGuessedText.textContent = this.answer.join(" ");
    //Remaing number of guesses
    guessesRemainingText.textContent = "Guesses Remaining: " + this.guessesRemaining;
    //Displays the guesses made by the user
    lettersGuessedText.textContent = "Letters Guessed: " + this.lettersGuessed.join(" ");
    //Amount of wins
    winCountText.textContent = "Wins: " + wins;
    //Amount of losses
    lossCountText.textContent = "Losses: " + losses;

}
game.updatePage();