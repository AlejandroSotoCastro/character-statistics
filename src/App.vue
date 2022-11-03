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
  return utils.percentRank(distribution, pointValue).toFixed(4) * 100;
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
        Number(this.stat1),
        Number(this.stat1),
        Number(this.stat1),
        Number(this.stat1),
        Number(this.stat1),
      ];
      console.log(utils.statRoll(), inputs);
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
  <p>{{ result }}</p>
</template>
