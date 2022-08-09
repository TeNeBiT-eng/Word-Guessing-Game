const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");

let word,
  incorrects = [];

function randomWord() {
  // getting random object from wordList
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word; // getting word of random object
  console.log(word);

  hint.innerText = ranObj.hint;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
  let key = e.target.value;
  if (key.match(/^[A-Za-z]+$/)) {
    console.log(key);
    if (word.includes(key)) {
      // if user letter found in the word
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          // showing matched letters in input
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      incorrects.push(key);
    }
  }
  typingInput.value = "";
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());
