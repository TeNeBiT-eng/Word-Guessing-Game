const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessesLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");

let word,
  maxGuesses,
  corrects = [],
  incorrects = [];

function randomWord() {
  // getting random object from wordList
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word; // getting word of random object
  maxGuesses = 8;
  (corrects = []), (incorrects = []);

  hint.innerText = ranObj.hint;
  guessesLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrects;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrects.includes(` ${key}`) &&
    !corrects.includes(key)
  ) {
    if (word.includes(key)) {
      // if user letter found in the word
      for (let i = 0; i < word.length; i++) {
        // showing matched letters in input
        if (word[i] === key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--; // decrement maxGuesses by 1
      incorrects.push(` ${key}`);
    }
    guessesLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (corrects.length === word.length) {
      // if users found all letters
      alert(`Congrats! You have found the word ${word.toUpperCase()}`);
      randomWord(); // calling randomfunc to reset game
    } else if (maxGuesses < 1) {
      // if users couldn't find all letters
      alert("Game over! You have no guesses left");
      for (let i = 0; i < word.length; i++) {
        // showing matched letters in input
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput());
document.addEventListener("keydown", () => typingInput.focus());
