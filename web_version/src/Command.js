import React from "react";
import Algorithme from "./population/algorithme";

const initState = {
  iteration: 0,
  play: false,
  timeSimulation: 50
};

export default class Command extends React.Component {
  constructor(props) {
    super(props);

    this.params = undefined;
    this.algo = undefined;
    this.result = [];
    this.resultJsx = [];
    this.animation = undefined;

    this.initAlgo();

    this.state = initState;
  }

  componentDidUpdate() {
    if (this.checkNewParams()) {
      this.stopAnimation();
      this.initAlgo();
      this.setState({
        ...initState,
        timeSimulation: this.state.timeSimulation
      });
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
    this.resultJsx = [];

    this.timeSimulation = timeSimulation;
  };

  checkNewParams = () => {
    return this.params !== this.props.params;
  };

  step = () => {
    let result = undefined;
    if (this.state.iteration === 0) {
      result = this.algo.firstStep();
    } else {
      result = this.algo.newIteration();
    }

    this.addResult(result);

    if (result.fit === 0) {
      this.stopAnimation();
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
    this.resultJsx.unshift(
      <tr
        key={`${this.result[0].chromosomes}:${this.result[0].fit}:${this.result[0].iteration}`}
        className="row text-center"
      >
        <td>{this.result[0].chromosomes}</td>
        <td>{this.result[0].fit}</td>
        <td>{this.result[0].iteration}</td>
      </tr>
    );
  };

  displayResult = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mot</th>
            <th scope="col">Fit</th>
            <th scope="col">Itération</th>
          </tr>
        </thead>
        <tbody>{this.resultJsx}</tbody>
      </table>
    );
  };

  stopAnimation = () => {
    if (this.animation !== undefined) {
      clearInterval(this.animation);
      this.animation = undefined;
    }
  };

  changeValueAnimation = () => {
    if (this.animation !== undefined) {
      this.stopAnimation();
      this.animation = setInterval(this.step, this.state.timeSimulation);
    }
  };

  handlePlayPause = () => {
    if (this.animation === undefined) {
      this.animation = setInterval(this.step, this.state.timeSimulation);
    } else {
      this.stopAnimation();
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
        className="btn btn-primary col-3"
        onClick={() => this.handlePlayPause()}
      >
        {message}
      </button>
    );
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="formControlRange">
            Durée entre chaque génération
          </label>
          <div className="row justify-content-around">
            <input
              className="form-control-range col-8"
              type="range"
              min={50}
              max={5000}
              step={50}
              onChange={e => {
                let newState = this.state;
                newState.timeSimulation = e.target.value;
                this.setState(newState, this.changeValueAnimation);
              }}
              value={this.state.timeSimulation}
            />
            <p className="col-2">{this.state.timeSimulation / 1000}s</p>
          </div>
        </div>
        <div className="row justify-content-around">
          <button
            type="button"
            className="btn btn-primary col-3"
            onClick={() => {
              this.stopAnimation();
              this.initAlgo();
              this.setState({
                ...initState,
                timeSimulation: this.state.timeSimulation
              });
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-primary col-3"
            onClick={() => {
              this.stopAnimation();
              this.step();
            }}
          >
            Step
          </button>
          {this.playPauseButton()}
        </div>
        {this.displayResult()}
      </div>
    );
  }
}
