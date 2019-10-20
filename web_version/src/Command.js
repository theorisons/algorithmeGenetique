import React from "react";

const defaultWord = "Abonne-toi";

const initState = {
  nbIndividuals: 1000,
  childrenElit: 90,
  parentElit: 30,
  timeSimulation: 50,
  probRandomChro: 5,
  word: defaultWord
};

export default class Command extends React.Component {
  constructor() {
    super();
    this.state = initState;
  }

  render() {
    // console.log(this.state);
    return (
      <form
        onSubmit={e => {
          console.log("event");
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <label htmlFor="formControlRange">Éléments à trouver</label>
          <input
            type="text"
            className="form-control-plaintext border"
            onChange={e => {
              let newState = this.state;
              newState.word = e.target.value;
              this.setState(newState);
            }}
            value={this.state.word}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formControlRange">Nombre d'individus</label>
          <div className="row">
            <input
              className="form-control-range col-10"
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
          <div className="row">
            <input
              className="form-control-range col-10"
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
          <div className="row">
            <input
              className="form-control-range col-10"
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
          <div className="row">
            <input
              className="form-control-range col-10"
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
        <div className="form-group">
          <label htmlFor="formControlRange">
            Durée entre chaque génération
          </label>
          <div className="row">
            <input
              className="form-control-range col-10"
              type="range"
              min={50}
              max={5000}
              step={50}
              onChange={e => {
                let newState = this.state;
                newState.timeSimulation = e.target.value;
                this.setState(newState);
              }}
              value={this.state.timeSimulation}
            />
            <p className="col-2">{this.state.timeSimulation / 1000}s</p>
          </div>
        </div>
        <div className="row justify-content-around">
          <button
            className="btn btn-secondary col-4"
            type="button"
            onClick={() => {
              let newState = initState;
              newState.word = defaultWord;
              this.setState(newState);
            }}
          >
            Réinitialiser
          </button>
          <button type="submit" className="btn btn-primary col-4">
            Lancer
          </button>
        </div>
      </form>
    );
  }
}
