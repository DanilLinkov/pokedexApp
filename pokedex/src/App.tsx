import React from 'react';
import Pokedex from "./components/pokedex/Pokedex";
import Pokemon from "./components/pokemon/Pokemon";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props} />}
    />
  </Switch>
  );
}

export default App;
