function Letter(letter) {
    this.letter = letter;
    this.guess = false;
}

Letter.prototype.display = function () {
    if (this.letter === ' ') {
        return ' ';
    } else {
        if (this.guess) {
            return this.letter;
        } else {
            return '_';
        }
    };
};

Letter.prototype.letterGuess = function (userGuess) {
    if (userGuess === this.letter) {
        this.guess = true;
    } else {
        return;
    }
}

module.exports = Letter;