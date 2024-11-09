const colors = {
  reds: ["salmon", "indianred", "crimson", "firebrick", "red"],
  oranges: ["coral", "tomato", "gold", "orange", "orangered"],
  yellows: [
    "lemonchiffon",
    "papayawhip",
    "moccasin",
    "peachpuff",
    "khaki",
    "yellow"
  ],
  greens: [
    "lawngreen",
    "chartreuse",
    "limegreen",
    "lime",
    "forestgreen",
    "green",
    "yellowgreen",
    "greenyellow",
    "springgreen",
    "seagreen",
    "olive"
  ],
  cyans: [
    "cyan",
    "aqua",
    "aquamarine",
    "paleturquoise",
    "turquoise",
    "lightseagreen",
    "teal",
    "cadetblue"
  ],
  blues: [
    "powderblue",
    "lightskyblue",
    "deepskyblue",
    "dodgerblue",
    "cornflowerblue",
    "steelblue",
    "royalblue",
    "blue",
    "darkblue",
    "navy",
    "midnightblue",
    "mediumslateblue",
    "slateblue"
  ],
  purples: [
    "lavender",
    "thistle",
    "plum",
    "violet",
    "orchid",
    "fuchsia",
    "magenta",
    "blueviolet",
    "purple",
    "indigo"
  ],
  pinks: [
    "pink",
    "lightpink",
    "hotpink",
    "deeppink",
    "palevioletred",
    "mediumvioletred"
  ]
};
let body = document.getElementsByTagName("body")[0];
let scoreElem = document.getElementById("score");
let attemptsElem = document.getElementById("attempts");
let endScreen = document.getElementById("end-screen");
let score = 0;
let attempts = 0;
let maxAttempst = 10;

Array.from(
  document
    .getElementsByClassName("container")[0]
    .getElementsByTagName("button")
).forEach(button => {
  button.addEventListener("click", event => {
    if (body.dataset["value"] == event.target.dataset["value"]) {
      score++;
    }
    attempts++;

    if (attempts >= maxAttempst) {
      showEndScreen();
    } else {
      doRound();
    }
  });
});

function reset() {
  score = 0;
  attempts = 0;
  updateDisplays();
  endScreen.classList.add("hidden");
}

function showEndScreen() {
  endScreen.classList.remove("hidden");
  endScreen.children.item(0).children.namedItem("score").innerHTML =
    "You got " + score + " out of " + maxAttempst + " right";
}

function updateDisplays() {
  scoreElem.innerHTML = "Score: " + score + "/" + maxAttempst;
  attemptsElem.innerHTML = "Answered: " + attempts;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setButton(id, val) {
  let button = document.getElementById("answer-" + id);
  button.innerHTML = val;
  button.dataset["value"] = val;
}

function getRandomProperty(obj) {
  let keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}

function setRandomBackgroundColor() {
  let colorType = getRandomProperty(colors);
  let colorPos = randomNumberBetween(0, colorType.length - 1);

  body.style.background = colorType[colorPos];
  body.dataset["value"] = colorType[colorPos];

  return [colorType, colorPos];
}

function doRound() {
  updateDisplays();
  let [colorType, colorPos] = setRandomBackgroundColor();

  let correctAnswerButton = randomNumberBetween(1, 3);
  setButton(correctAnswerButton, colorType[colorPos]);
  let buttonIds = [1, 2, 3];
  let possibleVals = Array.from(
    Array(colorType.length),
    (x, index) => index
  ).filter(v => v != colorPos);
  buttonIds
    .filter(bi => bi != correctAnswerButton)
    .forEach(bi => {
      let otherColorPos = getRandomProperty(possibleVals);
      setButton(bi, colorType[otherColorPos]);
      possibleVals = possibleVals.filter(v => v != otherColorPos);
    });
}

doRound();