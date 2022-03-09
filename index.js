//**Calculate how weird were my rolls */

/**Ex: 6 for a d6*/
function dX(sides) {
  return Math.floor(Math.random() * sides + 1);
}

/**Roll one stat */
function statRoll() {
  let rolls = [];
  for (let i = 0; i < 4; i++) {
    rolls.push(dX(6));
  }
  //keep higher 3
  rolls.sort((a, b) => b - a).pop();
  // add higher 3
  const higher3 = rolls.reduce((previousValue, currentValue) => previousValue + currentValue);

  return higher3;
}

/**Roll character stats */
function charStats() {
  const character = [];
  for (let i = 0; i < 6; i++) {
    character.push(statRoll());
  }
  return character;
}

/**Expect character to be an array with 6 stats */
function calcPoints(character) {
  const pointBuy = [-9, -6, -4, -2, -1, 0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 19];

  const pointBuyScore = character.reduce((previousValue, currentValue) => previousValue + pointBuy[currentValue - 3], 0);
  return pointBuyScore;
}

// console.log(calcPoints(charStats()));

// Learn about API authentication here: https://plotly.com/nodejs/getting-started
// Find your api_key here: https://plotly.com/settings/api

const { userName, key } = require("./secrets");
const plotly = require("plotly")(userName, key);

const runs = 1e5;
const results = Array.apply(null, Array(16)).map(() => 0);
for (let i = 0; i < runs; i++) {
  const stat = statRoll();
  results[stat - 3] += 1;
}
//console.log(results);

var data = [
  {
    x: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
    y: results,
    type: "bar",
  },
];
var graphOptions = { filename: "basic-bar", fileopt: "overwrite" };
plotly.plot(data, graphOptions, function (err, msg) {
  console.log(msg.url);
});

//second image

const results2 = [];
for (let i = 0; i < runs; i++) {
  results2.push(calcPoints(charStats()));
}

var data2 = [
  {
    x: results2,
    type: "histogram",
  },
];
var graphOptions = { filename: "point-buy", fileopt: "overwrite" };
plotly.plot(data2, graphOptions, function (err, msg) {
  console.log(msg.url);
});

//my stats
const myStats = [16, 18, 8, 17, 14, 12];
console.log("My Points",calcPoints(myStats));


// With simple values
const percentile = require("percentile");
const percentileScore = 98.5
console.log(`Percentil ${percentileScore} `,percentile(percentileScore, results2)); 
