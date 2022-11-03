//Utility functions for D&D stuff

export default class DndUtils {
  /**Ex: 6 for a d6*/
  dX(sides) {
    return Math.floor(Math.random() * sides + 1);
  }

  /**Roll one stat */
  statRoll() {
    let rolls = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(this.dX(6));
    }
    //keep higher 3
    rolls.sort((a, b) => b - a).pop();
    // add higher 3
    const higher3 = rolls.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    return higher3;
  }

  /**Roll character stats */
  charStats() {
    const character = [];
    for (let i = 0; i < 6; i++) {
      character.push(this.statRoll());
    }
    return character;
  }

  /**Expect character to be an array with 6 stats */
  calcPoints(character) {
    const pointBuy = [-9, -6, -4, -2, -1, 0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 19];

    const pointBuyScore = character.reduce(
      (previousValue, currentValue) =>
        previousValue + pointBuy[currentValue - 3],
      0
    );
    return pointBuyScore;
  }

  disadvantage() {
    const first = this.dX(20);
    const second = this.dX(20);
    if (first > second) {
      return second;
    } else return first;
  }

  advantage() {
    const first = this.dX(20);
    const second = this.dX(20);
    if (first > second) {
      return first;
    } else return second;
  }

  didIHit(bonus, ac, adOrDis) {
    let roll;

    // rolling with advantage
    if (adOrDis && adOrDis === "advantage") {
    }
    // rolling with disadvantage
    else if (adOrDis && adOrDis === "disadvantage") {
    }
    // plain roll
    else {
    }
  }

  percentRank = (arr, value) => {
    arr.sort(function (a, b) {
      return a - b;
    });

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i / (arr.length - 1);
      }
    }

    // calculate value using linear interpolation
    let x1, x2, y1, y2;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < value && value < arr[i + 1]) {
        x1 = arr[i];
        x2 = arr[i + 1];
        y1 = percentRank(arr, x1);
        y2 = percentRank(arr, x2);
        return ((x2 - value) * y1 + (value - x1) * y2) / (x2 - x1);
      }
    }

    throw new Error("Out of bounds");
  };
}
