// var guessesRemaining = 10;
var wins = 0;
var losses = 0;

var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var wordGuessedText = document.getElementById("word-guessed-text");
var lettersGuessedText = document.getElementById("letters-guessed-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var lossCountText = document.getElementById("losses-text");
var winCountText = document.getElementById("wins-text");

var game = new wordGuess();


document.onkeyup = function(event) {
// create functions to call
    var userGuess = event.key;    
    console.log(this.gameOver + " here");
    console.log(userGuess);
    if(!game.gameOver)
    {
        if (!game.lettersGuessed.includes(userGuess))
        {
            game.checkGuess(userGuess);
        }
    
    }
    else {
        game = new wordGuess();
        game.updatePage();
    }
};

function wordGuess () {
    this.wordChoices = ["my","first","javascript","game"]
    this.word = this.wordChoices[Math.floor(Math.random() * this.wordChoices.length)];
    this.answer = [];
    for (var i = 0; i < this.word.length; i++)
    {
        this.answer[i] = '_';
    }
    this.guessesRemaining = 10;
    this.lettersGuessed = [];
    this.gameOver = false;
    this.wordFlag = [];
    for (var i = 0; i < this.word.length; i++)
    {
        this.wordFlag[i] = false;
    }
    
}

//create function for checking logic
wordGuess.prototype.checkGuess = function (guess) {
    this.lettersGuessed.push(guess.toUpperCase());

    var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === guess) {
			isInWord = true;
            this.answer[i] = guess.toUpperCase();
            this.wordFlag[i] = true;
		}
    }
    console.log
	if (!isInWord) {
        this.guessesRemaining--;
	}

	if (this.guessesRemaining == 0) {
		losses++;
        this.gameOver = true;
	}

   
    if (!this.wordFlag.includes(false)) {
        wins++;
        this.gameOver = true;
    }

    game.updatePage();
};

wordGuess.prototype.updatePage  = function ()
{
    // Hide the directions
    directionsText.textContent = "";

    // Display the user and computer guesses, and wins/losses/ties.
    //userChoiceText.textContent = "You chose: " + this.userGuess;
    // Display current guesses
    wordGuessedText.textContent =  this.answer.join(" ");
    
    //remaing number of guesses
    guessesRemainingText.textContent = "Guessing Remaining: " + this.guessesRemaining;

    lettersGuessedText.textContent = "Letters Guessed: " + this.lettersGuessed.join(" ");
    // amount of wins
    winCountText.textContent = "Wins: " + wins;
    // amount of losses
    lossCountText.textContent = "Losses: " + losses;  
       
}
game.updatePage(); 