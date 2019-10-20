import React from "react";
import Population from "./population/population";

let word = "Test de longueur";
let population;
let reqTime;

export default class Algo extends React.Component {
  constructor() {
    super();
    this.result = [];

    this.state = {
      iteration: 0,
      displayPop: false
    };
  }

  componentDidUpdate() {
    if (population.arrayInd[0].fit === 0) {
      clearInterval(this.reqTime);
    }
  }

  newResearch() {
    population = new Population(1000, word.length, 10, 90, 10);
    population.evaluation(word);
    population.arrange();

    this.result = [];
    let newState = this.state;
    newState.iteration = 0;
    this.setState(newState);
  }

  addResult() {
    this.result.unshift(
      <p key={this.state.iteration}>
        {population.arrayInd[0].chromosomes} avec fit :{" "}
        {population.arrayInd[0].fit} en {this.state.iteration}
      </p>
    );
  }

  newIteration() {
    population.evolution();
    population.evaluation(word);
    population.arrange();

    let newState = this.state;
    newState.iteration = newState.iteration + 1;

    this.addResult();
    this.setState(newState);
  }

  displayPopulation() {
    if (this.state.displayPop) {
      return population.arrayInd.map((individual, index) => (
        <p key={`${this.state.iteration}:${index}`}>{individual.display()}</p>
      ));
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.newIteration()}>Nouvelle itération</button>
        <p>Mot à chercher : {word}</p>
        {this.result.map(el => el)}

        <button
          onClick={() =>
            (reqTime = setInterval(() => {
              this.newIteration();
            }, 50))
          }
        >
          GO
        </button>

        <button
          onClick={() => {
            let newState = this.state;
            newState.displayPop = !newState.displayPop;
            this.setState(newState);
          }}
        >
          Voir population
        </button>
        {this.displayPopulation()}
      </div>
    );
  }
}
