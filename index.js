var Word = require('./Word.js');
var inquirer = require('inquirer');

var chosenWord;

var batman = new Word('batman');

var wordChoices = ['Batman', 'Robin', 'Batgirl', 'Nightwing', 'Red Hood', 'Oracle', 'Bane', 'Riddler', 'Joker', 'Harley Quinn', 'Poison Ivy', 'Penquin', 'Catwoman', 'Hush', 'Alfred', 'Arkham', 'Clayface', 'Killer Croc', 'Gordon', 'Mad Hatter', 'Mr Freeze', 'Two Face', 'Scarecrow', 'Bullock', 'Bruce', 'Wayne', 'Grayson'];

// Function used to select index number

function wordIndex(x) {
    return Math.floor(Math.random() * x);
}

// Selects the computers answer using previous function and array

function chooseWord() {
    return wordChoices[wordIndex(wordChoices.length)]
}

function start (){
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'start',
            message: 'Welcome to Batman Word Guess! Would you like to begin?'
        }

    ]).then(function(answer){
        if (answer.start){
            console.log('Begin!');
            gameSet();

        } else {
            console.log('Goodbye!');
            process.exit();
        };
    });
};

function gameSet(){
    chosenWord = new Word(chooseWord());
    

}

start();


