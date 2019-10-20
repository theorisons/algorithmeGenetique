import React from "react";
import Algorithme from "./population/algorithme";

const initState = {
  iteration: 0,
  play: false
};

export default class Command extends React.Component {
  constructor(props) {
    super(props);

    this.params = undefined;
    this.algo = undefined;
    this.result = [];
    this.animation = undefined;

    this.initAlgo();

    this.state = initState;
  }

  componentDidUpdate() {
    if (this.checkNewParams()) {
      this.initAlgo();
      this.setState(initState);
    }
  }

  initAlgo = () => {
    const {
      nbIndividuals,
      parentElit,
      childrenElit,
      probRandomChro,
      timeSimulation,
      word
    } = this.props.params;

    this.params = this.props.params;
    this.animation = undefined;

    this.algo = new Algorithme(
      nbIndividuals,
      word.length,
      parentElit,
      childrenElit,
      probRandomChro,
      word
    );

    this.result = [];
    this.timeSimulation = timeSimulation;
  };

  checkNewParams = () => {
    return this.params !== this.props.params;
  };

  step = () => {
    if (this.state.iteration === 0) {
      this.addResult(this.algo.firstStep());
    } else {
      this.addResult(this.algo.newIteration());
    }
    this.setState({
      ...this.state,
      iteration: this.state.iteration + 1
    });
  };

  addResult = result => {
    this.result.unshift({
      ...result,
      iteration: this.state.iteration
    });
  };

  displayResult = () => {
    return this.result.map(res => (
      <div
        key={`${res.chromosomes}:${res.fit}:${res.iteration}`}
        className="row text-center"
      >
        <p className="col-8">{res.chromosomes}</p>
        <p className="col-1">{res.fit}</p>
        <p className="col-1">{res.iteration}</p>
      </div>
    ));
  };

  handlePlayPause = () => {
    if (this.animation === undefined) {
      this.animation = setInterval(this.step, this.params.timeSimulation);
    } else {
      clearInterval(this.animation);
    }
    this.setState({
      ...this.state,
      play: !this.state.play
    });
  };

  playPauseButton = () => {
    let message = "Play";
    if (this.animation !== undefined) {
      message = "Pause";
    }
    return (
      <button
        type="button"
        className="btn btn-primary col-4"
        onClick={() => this.handlePlayPause()}
      >
        {message}
      </button>
    );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="row justify-content-around">
          <button
            type="button"
            className="btn btn-primary col-4"
            onClick={() => {
              this.step();
            }}
          >
            Step
          </button>
          {this.playPauseButton()}
        </div>
        <div>{this.displayResult()}</div>
      </div>
    );
  }
}
