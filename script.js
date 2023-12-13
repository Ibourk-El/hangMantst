import { quetions } from "./quetions.js";
let answerBox = document.getElementById("answer-box");
let chanceEl = document.getElementById("chance");
let quetionBox = document.getElementById("quetion");
let menu = document.getElementById("menu");
let imgChar = document.getElementById("img-char");
let startBtn = document.querySelector(".start");
let restartBtn = document.querySelector(".restart");
let menuBtn = document.querySelector(".menu-btn");
let nextBtn = document.querySelector(".next");
let btnsBox = document.querySelector(".btns");
let cards = document.querySelectorAll(".card");
let btnsMenu = document.querySelector(".btns");
let keyboardBox = document.getElementById("keyboard-box");
let score = document.querySelector(".score");

//
let scoreNum = 0;
let catigory = "";
let catigoryQuetion = quetions[catigory];
let questionIndex = 1;
let letters = "azertyuiopmlkjhgfdsqwxcvbn ";
let chance = 10;
let heightOfCloser = 100;
let porsontge = 0;
//
// to chose the catigory
cards.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    resetCard();
    catigory = e.target.getAttribute("data-catigory");
    cards[i].classList.add("active");
    imgChar.src = quetions[catigory][0].img;
    document.body.style.backgroundImage = `url(${quetions[catigory][0].bg})`;
    heightOfCloser = 100;
    chance = 10;
    resetVars();
  });
});
// start geme
startBtn.addEventListener("click", (e) => {
  if (catigory !== "") menu.style.height = "0%";
  questionIndex = 1;
  heightOfCloser = 100;
  resetVars();
});

// restart game
restartBtn.addEventListener("click", (e) => {
  heightOfCloser = 100;
  resetVars();
  btnsBox.style.height = "0%";
});
// next game
nextBtn.addEventListener("click", (e) => {
  questionIndex++;
  scoreNum++;
  heightOfCloser = 100;
  score.innerHTML = scoreNum;
  btnsBox.style.height = "0%";
  imgChar.src = quetions[catigory][0].img;
  resetVars();
});

// return to menu
menuBtn.addEventListener("click", (e) => {
  menu.style.height = "100%";
  e.target.parentElement.style.height = "0%";
  resetCard();
});
// reset card style
function resetCard() {
  cards.forEach((e) => {
    e.className = "card";
  });
}
// add tiris to answer Box
function addTiris(word) {
  let text = "";
  for (let i = 0; i < word.length; i++) {
    text += "-";
  }
  return text;
}

// letters box
function createLetterBox(value) {
  let span = document.createElement("span");
  span.className = "letter";
  span.innerHTML = value;
  addEventToLetter(span);
  span.classList.add("clicked");
  return span;
}
// add chars to answer box
function addCharToAnswerBox(value) {
  let span = document.createElement("span");
  span.className = "answer-letter";
  span.innerHTML = value;
  return span;
}
// for keyboard
function pushLettersToBox(className, letters, elFun) {
  let Box = document.getElementById(className);
  let len = letters.length;
  for (let i = 0; i < len; i++) {
    Box.appendChild(elFun(letters[i]));
  }
}
//add enents keyBord
function addEventToLetter(letterBox) {
  letterBox.addEventListener("click", (e) => {
    if (letterBox.classList.contains("clicked")) {
      if (
        checkIfLetterInAnsewr(
          catigoryQuetion[questionIndex].answer,
          e.target.innerHTML
        )
      ) {
        e.target.classList.add("true");
        toTheNextQuetion(heightOfCloser);
      } else {
        e.target.classList.add("false");
        chance--;
        chanceEl.innerHTML = chance;
        lose(chance);
      }
      letterBox.classList.remove("clicked");
      playSound("./sounds/mech-keyboard.mp3");
    }
  });
}
//
function checkIfLetterInAnsewr(answer, char) {
  let len = answer.length;
  let isFinedIt = false;
  for (let i = 0; i < len; i++) {
    if (answer[i].toLowerCase() === char) {
      answerBox.children[i].innerHTML = answer[i];
      isFinedIt = true;
      heightOfCloser -= porsontge;
      console.log(heightOfCloser, porsontge, "x");
      removeThCloser(heightOfCloser);
    }
  }
  return isFinedIt;
}
// show btns menu win lose
function lose(x) {
  if (x == 0) {
    btnsMenu.style.height = "100%";
    nextBtn.style.display = "none";

    playSound("./sounds/error.wav");
    removeThCloser(catigoryQuetion);
  } else {
    console.log(x);
  }
}

// to show a part of the image
function removeThCloser(pos) {
  let closeBox = document.getElementById("close");
  closeBox.style.height = pos + "%";
}
// next quetion
function toTheNextQuetion(hOfC) {
  if (hOfC <= 0) {
    if (questionIndex < catigoryQuetion.length - 1) {
      // win logic
      btnsMenu.style.height = "100%";
      nextBtn.style.display = "inline-block";
      imgChar.src = quetions[catigory][0].gif;
      heightOfCloser = 0;
      playSound("./sounds/win.mp3");
      resetVars();
    } else {
      btnsMenu.style.height = "100%";
      nextBtn.style.display = "none";
      removeThCloser(0);
      questionIndex = 1;
    }
  } else {
    console.log(hOfC);
  }
}
// to reset data
function resetVars() {
  catigoryQuetion = quetions[catigory];
  quetionBox.innerHTML = catigoryQuetion[questionIndex].question;
  porsontge = 100 / catigoryQuetion[questionIndex].answer.length;
  porsontge += 0.01;
  removeThCloser(heightOfCloser);
  // reset chence
  chance = 10;
  chanceEl.innerHTML = chance;
  // reset answer Box
  answerBox.innerHTML = "";
  pushLettersToBox(
    "answer-box",
    addTiris(catigoryQuetion[questionIndex].answer),
    addCharToAnswerBox
  );
  // reset keyboard
  keyboardBox.innerHTML = "";
  pushLettersToBox("keyboard-box", letters, createLetterBox);
}

function playSound(audioName) {
  let audio = new Audio(audioName);
  audio.play();
}

// playSound("./sounds/gameGame.mp3",true)

// sound
let soundIcon = document.querySelector(".musicIcon");
let slash = document.querySelector(".slash");
let MainSound = document.querySelector("#mainAudio");
MainSound.play();
let playMusic = false;
soundIcon.addEventListener("click", () => {
  slash.classList.toggle("active");
  if (playMusic) {
    MainSound.play();
    playMusic = false;
  } else {
    MainSound.pause();
    playMusic = true;
  }
});
