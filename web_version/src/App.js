import React from "react";
import Params from "./Params";
import Command from "./Command";

const initState = {
  params: {
    nbIndividuals: 1000,
    childrenElit: 90,
    parentElit: 30,
    probRandomChro: 5,
    word: "Abonne-toi"
  }
};

const copyright = () => {
  return (
    <div>
      <a
        href={"https://github.com/theorisons/algorithmeGenetique"}
        rel="noopener noreferrer"
        target="_blank"
      >
        Repository Github
      </a>
      <br />
      <a
        href={"https://www.youtube.com/theorisons/?sub_confirmation=1"}
        rel="noopener noreferrer"
        target="_blank"
      >
        Copyright © Oct 2019 Théorisons
      </a>
    </div>
  );
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

          <div className="text-right p-2 d-block d-sm-none">{copyright()}</div>
          {/* COPYRIGHT DISPLAY SMALL SCREEN ON TOP */}

          <div className="text-right p-2 fixed-bottom d-sm-block d-none">
            {copyright()}
          </div>
          {/* COPYRIGHT LARGE SCREEN ON THE BOTTOM */}
        </header>

        <hr className="p-1" />

        <div className="row no-gutters">
          <div className="col-sm-6 p-2">
            <h3 className="text-center">Panneau d'affichage</h3>
            <Command params={this.state.params} />
          </div>

          <div className="col-sm-6 p-2">
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
