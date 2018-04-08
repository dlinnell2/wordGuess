var Word = require('./Word.js');

var batman = new Word('batman');

batman.buildArray();

var display = batman.displayWord.join(' ');

console.log(display);
