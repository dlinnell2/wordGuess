var Word = require('./Word.js');
var inquirer = require('inquirer');

var chosenWord;
var guessCount;
var guessed = [];
var userGuess;

var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var batman = new Word('batman');

var wordChoices = ['Batman', 'Robin', 'Batgirl', 'Nightwing', 'Red Hood', 'Oracle', 'Bane', 'Riddler', 'Joker', 'Harley Quinn', 'Poison Ivy', 'Penquin', 'Catwoman', 'Hush', 'Alfred', 'Arkham', 'Clayface', 'Killer Croc', 'Gordon', 'Mad Hatter', 'Mr Freeze', 'Two Face', 'Scarecrow', 'Bullock', 'Bruce', 'Wayne', 'Grayson'];

// Function used to select index number

function wordIndex(x) {
    return Math.floor(Math.random() * x);
}

// Selects the computers answer using previous function and array

function chooseWord() {
    return wordChoices[wordIndex(wordChoices.length)].toLowerCase();
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
    console.log(chosenWord.displayArr.join(' '));
    console.log(`Incorrect Guesses Remaining : ${guessCount}`);
};

function gameSet() {
    chosenWord = new Word(chooseWord());
    chosenWord.buildArray();

    guessCount = 5;

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

    if ((guessCount > 0) && (chosenWord.displayArr.indexOf('_') > -1)) {

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

            userGuess = answer.guess;

            for (var item of chosenWord.letters) {
                console.log(item);
                if ((item.letter === userGuess) && (item.guess) || (guessed.indexOf(userGuess) > -1)) {
                    console.log(`You've already guessed that letter!`);

                    checkGuess(guessCount--);

                    return;

                } else if ((item.letter === userGuess) && (!item.guess)) {
                    console.log(`Correct Guess!`);

                    checkGuess(chosenWord.isRight(userGuess));

                    return;

                }

            }

            console.log('Incorrect Guess!');
            
            checkGuess(guessCount--);

            return;

        });

    } else {
        console.log(`You've Won!`);
        process.exit();
    }
};

start();


