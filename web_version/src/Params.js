import React from "react";
import { checkForLetters } from "./population/utilities";

export default class Params extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.values
    };
  }

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <label htmlFor="formControlRange">Éléments à trouver</label>
          <div className="row justify-content-around">
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                onChange={e => {
                  let newState = this.state;
                  newState.word = checkForLetters(e.target.value);
                  this.setState(newState);
                }}
                value={this.state.word}
              />
            </div>
            <p className="col-2">{this.state.word.length}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formControlRange">Nombre d'individus</label>
          <div className="row justify-content-around">
            <input
              className="form-control-range col-8"
              type="range"
              min={0}
              max={5000}
              step={50}
              onChange={e => {
                let newState = this.state;
                newState.nbIndividuals = e.target.value;
                this.setState(newState);
              }}
              value={this.state.nbIndividuals}
            />
            <p className="col-2">{this.state.nbIndividuals}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formControlRange">
            Pourcentage d'enfants générés par élilistisme
          </label>
          <div className="row justify-content-around">
            <input
              className="form-control-range col-8"
              type="range"
              min={0}
              max={100}
              onChange={e => {
                let newState = this.state;
                newState.childrenElit = e.target.value;
                this.setState(newState);
              }}
              value={this.state.childrenElit}
            />
            <p className="col-2">{this.state.childrenElit}%</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formControlRange">
            Pourcentage de parents retenus par élilistisme
          </label>
          <div className="row justify-content-around">
            <input
              className="form-control-range col-8"
              type="range"
              min={0}
              max={100}
              onChange={e => {
                let newState = this.state;
                newState.parentElit = e.target.value;
                this.setState(newState);
              }}
              value={this.state.parentElit}
            />
            <p className="col-2">{this.state.parentElit}%</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formControlRange">
            Probabalité d'obtenir un chromosome aléatoire
          </label>
          <div className="row justify-content-around">
            <input
              className="form-control-range col-8"
              type="range"
              min={0}
              max={100}
              onChange={e => {
                let newState = this.state;
                newState.probRandomChro = e.target.value;
                this.setState(newState);
              }}
              value={this.state.probRandomChro}
            />
            <p className="col-2">{this.state.probRandomChro}%</p>
          </div>
        </div>

        <div className="row justify-content-around">
          <button
            className="btn btn-secondary col-4"
            type="button"
            onClick={() => {
              this.setState(this.props.resetValues());
            }}
          >
            Réinitialiser
          </button>

          <button
            type="button"
            className="btn btn-primary col-4"
            onClick={() => {
              this.props.updateValues(this.state);
            }}
          >
            Changer
          </button>
        </div>
      </form>
    );
  }
}
