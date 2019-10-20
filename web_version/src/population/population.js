import Individual from "./individual";
import { randomValue } from "./utilities";

export default class Population {
  arrayInd = []; // Array of all the individuals in the population
  nbParentsElit; // Number of parents choose because of their fitness
  nbChildrenElit; // Number of children choose because of their fitness
  propRandomChro; // Percentage of chromosome generate randomly

  constructor(nbInd, sizeInd, parentElit, childElit, propRandomChro) {
    // parentElit = Percentage of parents choose because of their fitness
    // childElit = Percentage of children choose because of their fitness
    // Percentage of chromosome generate randomly
    let indTmp;

    for (let i = 0; i < nbInd; i++) {
      indTmp = new Individual();
      indTmp.initRandomly(sizeInd);
      this.arrayInd.push(indTmp);
    }

    this.nbParentsElit = Math.floor((parentElit / 100) * nbInd);
    this.nbChildrenElit = Math.floor((childElit / 100) * nbInd);
    this.propRandomChro = propRandomChro;
  }

  evaluation(word) {
    this.arrayInd.forEach(ind => ind.evaluation(word));
  }

  arrange() {
    this.arrayInd.sort((a, b) => a.fit - b.fit);
  }

  evolution() {
    // nbChildrenElit are generated with the nbParents with the best fitness
    // (nbInd - nbChildrenElit) are choose randomly
    let tmpArray = [];
    let tmpInd;

    let i;

    let indexP1 = 0;
    let indexP2 = 0;

    /* Generation of children based on the best fitness */
    for (i = 0; i < this.nbChildrenElit; i++) {
      tmpInd = new Individual();

      indexP1 = randomValue(this.nbParentsElit);
      indexP2 = randomValue(this.nbParentsElit);

      tmpInd.chromosomesEvolution(
        this.arrayInd[indexP1].chromosomes,
        this.arrayInd[indexP2].chromosomes,
        this.propRandomChro
      );

      tmpArray.push(tmpInd);
    }

    for (; i < this.arrayInd.length; i++) {
      tmpInd = new Individual();

      indexP1 = randomValue(this.arrayInd.length);
      indexP2 = randomValue(this.arrayInd.length);

      tmpInd.chromosomesEvolution(
        this.arrayInd[indexP1].chromosomes,
        this.arrayInd[indexP2].chromosomes,
        this.propRandomChro
      );

      tmpArray.push(tmpInd);
    }

    this.arrayInd = tmpArray;
  }

  display() {
    this.arrayInd.forEach(ind => ind.display());
  }
}
