import React from "react";
import Params from "./Params";
import Command from "./Command";

import "./App.css";

const initState = {
  params: {
    nbIndividuals: 1000,
    childrenElit: 90,
    parentElit: 30,
    timeSimulation: 50,
    probRandomChro: 5,
    word: "Abonne-toi"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initState
    };
  }

  updateValuesParams = newValuesParams => {
    let newState = this.state;
    newState.params = newValuesParams;

    this.setState(newState);
  };

  resetValuesParams = () => {
    return initState.params;
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="text-center">Algorithme Génétique</h1>
          {/* <p>Copyrigth Théorisons</p> */}
        </header>

        <div className="row">
          <div className="col-sm-6">
            <h3 className="text-center">Panneau d'affichage</h3>
            <Command params={this.state.params} />
          </div>

          <div className="col-sm-6">
            <h3 className="text-center">Panneau de commande</h3>
            <Params
              values={this.state.params}
              updateValues={this.updateValuesParams}
              resetValues={this.resetValuesParams}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
