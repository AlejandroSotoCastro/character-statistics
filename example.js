import u from "./math.mjs";
const utils = new u();

const runs = 1e6;

// create a distribution
const distribution = [];
for (let i = 0; i < runs; i++) {
  distribution.push(utils.calcPoints(utils.charStats()));
}

function calcRank(distribution, stats) {
  if (stats.length !== 6) return;
  //my stats
  const pointValue = utils.calcPoints(stats);
  return utils.percentRank(distribution, pointValue).toFixed(4) * 100;
}

const myStats = [16, 18, 8, 17, 14, 12];

console.log("percentil rank", calcRank(distribution, myStats));
