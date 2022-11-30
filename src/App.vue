<script>
import u from "../math";
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
  console.log(stats, pointValue);
  const res = {
    points: pointValue,
    rank: utils.percentRank(distribution, pointValue).toFixed(4) * 100,
  };
  return res;
}
export default {
  data() {
    return {
      result: "",
    };
  },
  methods: {
    addTodo() {
      const inputs = [
        Number(this.stat1),
        Number(this.stat2),
        Number(this.stat3),
        Number(this.stat4),
        Number(this.stat5),
        Number(this.stat6),
      ];
      this.result = calcRank(distribution, inputs);
    },
  },
};
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="stat1" />
    <input v-model="stat2" />
    <input v-model="stat3" />
    <input v-model="stat4" />
    <input v-model="stat5" />
    <input v-model="stat6" />
    <button>Add Todo</button>
  </form>
  <div v-if="result">
    <p>Your point equivalent is {{ result.points }}</p>
    <p>Your stats are better than the {{ result.rank }}% of possible stats</p>
  </div>
</template>
