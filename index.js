//**Calculate how weird were my rolls */

const utils = require("./math");
// Learn about API authentication here: https://plotly.com/nodejs/getting-started
// Find your api_key here: https://plotly.com/settings/api

const { userName, key } = require("./secrets");
const plotly = require("plotly")(userName, key);

const runs = 1e5;

/**First image */
const results = Array.apply(null, Array(16)).map(() => 0);
for (let i = 0; i < runs; i++) {
  const stat = utils.statRoll();
  results[stat - 3] += 1;
}

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
  results2.push(utils.calcPoints(utils.charStats()));
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
console.log("My Points", utils.calcPoints(myStats));

// With simple values
const percentile = require("percentile");
// const percentileScore = 98.5;
const percentileScore = 98.5;
console.log(`Percentil ${percentileScore} `, percentile(percentileScore, results2));
