import React from "react";

export default class Command extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.values
    };
  }

  displayButton = () => {
    let message = "Jouer";
    if (this.state.play) {
      message = "Pause";
    }
    return (
      <button
        onClick={() => {
          let newState = this.state;
          newState.play = !newState.play;
          this.setState(newState);
        }}
        className="btn btn-primary col-3"
      >
        {message}
      </button>
    );
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log("SUBMIT");
          this.props.updateValues(this.state);
        }}
      >
        <div className="form-group">
          <label htmlFor="formControlRange">Éléments à trouver</label>
          <div className="row">
            <input
              type="text"
              className="form-control-plaintext border col-10"
              onChange={e => {
                let newState = this.state;
                newState.word = e.target.value;
                this.setState(newState);
              }}
              value={this.state.word}
            />
            <p className="col-2">{this.state.word.length}</p>
          </div>
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
            className="btn btn-secondary col-3"
            type="button"
            onClick={() => {
              this.setState(this.props.resetValues());
            }}
          >
            Réinitialiser
          </button>

          {this.displayButton()}

          <button className="btn btn-primary col-3">Step</button>
        </div>
      </form>
    );
  }
}
