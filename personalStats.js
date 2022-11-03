//**Calculate how weird were my rolls */

import u from "./math.mjs";
const utils = new u();

// Learn about API authentication here: https://plotly.com/nodejs/getting-started
// Find your api_key here: https://plotly.com/settings/api

import { userName, key } from "./secrets.mjs";
import p from "plotly";
const plotly = p(userName, key);

const runs = 1e5;

/**First image */
const results = Array.apply(null, Array(16)).map(() => 0);
for (let i = 0; i < runs; i++) {
  const stat = utils.statRoll();
  results[stat - 3] += 1;
}

var data = [
  {
    x: [
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
    ],
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
import percentRank from "percentile-rank";
// const percentileScore = 98.5;
const percentileScore = 98.5;
results2.sort(function (a, b) {
  return a - b;
});
console.log("lets check", percentRank(results2, 57));
