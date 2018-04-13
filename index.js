var Word = require('./Word.js');
var inquirer = require('inquirer');

var chosenWord;
var checkWord;
var guessCount;
var guessed = [];
var userGuess;

var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var wordChoices = ['Batman', 'Robin', 'Batgirl', 'Nightwing', 'Red Hood', 'Oracle', 'Bane', 'Riddler', 'Joker', 'Harley Quinn', 'Poison Ivy', 'Penquin', 'Catwoman', 'Hush', 'Alfred', 'Arkham', 'Clayface', 'Killer Croc', 'Gordon', 'Mad Hatter', 'Mr Freeze', 'Two Face', 'Scarecrow', 'Bullock', 'Bruce', 'Wayne', 'Grayson'];

// Function used to select index number

function wordIndex(x) {
    return Math.floor(Math.random() * x);
}

// Selects the computers answer using previous function and array

function chooseWord() {
    return wordChoices[wordIndex(wordChoices.length)];
}

function start() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'start',
            message: 'Welcome to Batman Word Guess! Would you like to begin?'
        }

    ]).then(function (answer) {
        if (answer.start) {
            console.log('Begin!');
            gameSet();

        } else {
            console.log('Goodbye!');
            process.exit();
        };
    });
};

function createDisplay() {
    console.log(checkWord.displayArr.join(' '));
    console.log(`Incorrect Guesses Remaining : ${guessCount}`);
};

function gameSet() {

    chosenWord = chooseWord();
    checkWord = new Word(chosenWord.toLowerCase());
    checkWord.buildArray();

    guessCount = 5;
    guessed = [];

    createDisplay();
    gameRun();

};

function checkGuess(rightOrWrong) {
    rightOrWrong;
    guessed.push(userGuess);
    createDisplay();
    gameRun();
};

function gameRun() {

    if ((guessCount > 0) && (checkWord.displayArr.indexOf('_') > -1)) {

        inquirer.prompt([

            {
                message: 'Please enter a letter to guess!',
                name: 'guess',
                validate: function (value) {

                    if (validLetters.indexOf(value.toLowerCase()) > -1) {
                        return true;
                    } else if (value.length > 1) {
                        console.log('\n Please enter a single letter to continue')
                        return false;
                    }

                    console.log('\n Please enter a valid letter to continue')
                    return false;
                }
            }

        ]).then(function (answer) {

            userGuess = answer.guess.toLowerCase();

            for (var item of checkWord.letters) {
    
                if ((item.letter === userGuess) && (item.guess) || (guessed.indexOf(userGuess) > -1)) {
                    console.log(`You've already guessed that letter!`);

                    checkGuess(guessCount--);

                    return;

                } else if ((item.letter === userGuess) && (!item.guess)) {
                    console.log(`Correct Guess!`);

                    checkGuess(checkWord.isRight(userGuess));

                    return;

                };

            };

            console.log('Incorrect Guess!');
            
            checkGuess(guessCount--);

            return;

        });

    } else if (guessCount === 0) {
        console.log(`Sorry! The word was ${chosenWord}`);
        beginAgain();

    } else if (checkWord.displayArr.indexOf('_') === -1) {
        console.log(`Congrats! You've correctly guessed the word ${chosenWord}!`);
        beginAgain();
    }

};

function beginAgain(){

    inquirer.prompt([

        {
        type: 'confirm',
        name: 'beginAgain',
        message: 'Would you like to play again?'
        }

    ]).then(function(answer){
        if (answer.beginAgain){
            console.log('Let\'s begin!')
            gameSet();
        } else {
            console.log('Thanks for playing!');
            process.exit();
        }

    });

};

start();


