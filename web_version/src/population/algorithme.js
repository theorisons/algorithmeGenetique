import Population from "./population";

export default class Algorithm {
  population;
  word = "";

  constructor(nbInd, sizeInd, parentElit, childElit, propRandomChro, word) {
    this.population = new Population(
      nbInd,
      sizeInd,
      parentElit,
      childElit,
      propRandomChro
    );
    this.word = word;
  }

  firstStep = () => {
    this.population.evaluation(this.word);
    this.population.arrange();

    return this.result();
  };

  newIteration = () => {
    this.population.evolution();
    this.population.evaluation(this.word);
    this.population.arrange();

    return this.result();
  };

  result = () => {
    return {
      chromosomes: this.population.arrayInd[0].chromosomes,
      fit: this.population.arrayInd[0].fit
    };
  };
}
