var Letter = require('./Letter.js');

var letters = [];
var displayWord = [];

function Word (word) {
    this.word = word;
};

Word.prototype.buildArray = function(){

    letters = [];

    for (var item of this.word) {
        var newLetter = new Letter(item);
        letters.push(newLetter);
    };

    return letters;

    this.buildDisplay();

}

Word.prototype.buildDisplay = function(){

    displayWord = [];

    for (var item of letters){
        displayWord.push(item.display());
    }

    return displayWord;
};

Word.prototype.checkGuess = function(guess){
    for (var item of letters){
        item.userGuess(guess);
    }

    this.buildDisplay();
};

module.exports = Word;