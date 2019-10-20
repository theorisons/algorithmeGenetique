import React from "react";
import Algo from "./Algo";
import Command from "./Command";

import "./App.css";

const initState = {
  command: {
    nbIndividuals: 1000,
    childrenElit: 90,
    parentElit: 30,
    timeSimulation: 50,
    probRandomChro: 5,
    play: false,
    word: "Abonne-toi"
  },
  algo: {
    action: 0
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initState
    };
  }

  endAlgo = end => {
    if (end) {
      console.log("FIN");
    } else {
      console.log("NON");
    }
  };

  updateValuesCommand = newValuesCommand => {
    let newState = this.state;
    newState.command = newValuesCommand;

    newState.algo.action = 1;

    this.setState(newState);
  };

  resetValuesCommand = () => {
    return initState.command;
  };

  render() {
    console.log(this.state);
    return (
      <div className="container border">
        <header className="border">
          <h1 className="text-center">Algorithme Génétique</h1>
          {/* <p>Copyrigth Théorisons</p> */}
        </header>

        <div className="border row">
          <div className="border col-sm-6">
            <h3 className="text-center">Panneau d'affichage</h3>
            <Algo
              action={this.state.algo.action}
              validation={this.endAlgo}
              values={this.state.command}
            />
          </div>

          <div className="border col-sm-6">
            <h3 className="text-center">Panneau de commande</h3>
            <Command
              values={this.state.command}
              updateValues={this.updateValuesCommand}
              resetValues={this.resetValuesCommand}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
