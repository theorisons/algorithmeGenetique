import React from "react";
import Population from "./population/population";

export default class Algo extends React.Component {
  constructor(props) {
    super(props);

    this.result = [];
    this.iteration = 0;
    this.population = undefined;
    this.world = "";

    this.find = false;

    // this.state = {
    //   iteration: 0,
    //   displayPop: false
    // };
  }

  componentDidMount() {
    this.handler(this.props.action);
  }

  componentDidUpdate() {
    this.handler(this.props.action);
  }

  handler = action => {
    console.log("ACTION");
    console.log(action);
    switch (action) {
      case 0:
        // Nothing to do
        break;
      case 1:
        // Change values
        this.newResearch(this.props.values);
        break;
      case 2:
        // Step the programm
        this.newIteration();
        break;
      default:
        // Nothing
        break;
    }

    this.props.validation(this.find);
    // if (population !== undefined) {
    //   if (population.arrayInd[0].fit === 0) {
    //     clearInterval(this.reqTime);
    //   }
    // }
  };

  newResearch(parameters) {
    const {
      nbIndividuals,
      childrenElit,
      parentElit,
      probRandomChro,
      word
    } = parameters;

    this.population = new Population(
      nbIndividuals,
      word.length,
      parentElit,
      childrenElit,
      probRandomChro
    );
    this.word = word;
    this.population.evaluation(this.word);
    this.population.arrange();

    this.result = [];
    this.iteration = 0;
    this.find = false;
  }

  addResult() {
    this.result.unshift(
      <p key={this.iteration}>
        {this.population.arrayInd[0].chromosomes} avec fit :{" "}
        {this.population.arrayInd[0].fit} en {this.iteration}
      </p>
    );
  }

  newIteration() {
    this.population.evolution();
    this.population.evaluation(this.word);
    this.population.arrange();

    this.iteration += 1;

    this.addResult();
    if (this.population.arrayInd[0].fit === 0) {
      this.find = true;
    }
  }

  // displayPopulation() {
  //   if (this.state.displayPop) {
  //     return population.arrayInd.map((individual, index) => (
  //       <p key={`${this.state.iteration}:${index}`}>{individual.display()}</p>
  //     ));
  //   }
  // }

  render() {
    console.log(this.result);
    return (
      <div>
        {this.result.map(el => el)}

        {/* <button
          onClick={() =>
            (reqTime = setInterval(() => {
              this.newIteration();
            }, 50))
          }
        >
          GO
        </button> */}

        {/* <button
          onClick={() => {
            let newState = this.state;
            newState.displayPop = !newState.displayPop;
            this.setState(newState);
          }}
        >
          Voir population
        </button>
        {this.displayPopulation()} */}
      </div>
    );
  }
}
