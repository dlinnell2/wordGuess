var Letter = require('./Letter.js');

function Word (word) {
    this.word = word;
    this.letters = [];
    this.displayWord = [];
};

Word.prototype.buildArray = function(){

    letters = [];

    for (var item of this.word) {
        var newLetter = new Letter(item);
        this.letters.push(newLetter);
    };

    this.buildDisplay();

}

Word.prototype.buildDisplay = function(){

    this.displayWord = [];

    for (var item of this.letters){
        this.displayWord.push(item.display());
    }

    return this.displayWord;
};

Word.prototype.checkGuess = function(guess){
    for (var item of this.letters){
        item.userGuess(guess);
    }

    this.buildDisplay();

};

module.exports = Word;