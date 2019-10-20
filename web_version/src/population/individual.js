import { generateRandomChar, randomValue } from "./utilities";

export default class Individual {
  chromosomes = "";
  fit = -1;

  initRandomly(size) {
    // Create chromosomes for the first time with random value
    for (let i = 0; i < size; i++) {
      this.chromosomes = this.chromosomes + generateRandomChar();
    }
  }

  chromosomesEvolution(parent1, parent2, p) {
    /*
    Generate a new chromosomes based on 
    50 % of parent 1
    50 % of parent 2
    percentage p to choose randomly the value
    */

    let i = 0;
    let randomVal;

    for (; i < parent1.length / 2; i++) {
      randomVal = randomValue(100);
      if (randomVal < p) {
        this.chromosomes = this.chromosomes + generateRandomChar();
      } else {
        this.chromosomes = this.chromosomes + parent1[i];
      }
    }

    for (; i < parent1.length; i++) {
      randomVal = randomValue(100);
      if (randomVal < p) {
        this.chromosomes = this.chromosomes + generateRandomChar();
      } else {
        this.chromosomes = this.chromosomes + parent2[i];
      }
    }
  }

  evaluation(word) {
    // Evaluate the chromosomes to calculate it's fitness
    this.fit = 0;
    for (let i = 0; i < this.chromosomes.length; i++) {
      if (word[i] !== this.chromosomes[i]) {
        this.fit += 1;
      }
    }
  }

  display = () => {
    return this.chromosomes + " fit : " + this.fit;
  };
}
