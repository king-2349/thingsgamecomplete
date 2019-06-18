import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Appbar from './components/Appbar';
import Home from './components/Home';
import Game from './components/Game';
import NewGameOptions from './components/NewGameOptions';
import JoinGameOptions from './components/JoinGameOptions';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <React.Fragment>
      <Appbar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/newGame' component={NewGameOptions} />
        <Route exact path='/joinGame' component={JoinGameOptions} />
        <Route exact path='/game' component={Game} />
        <Route component={PageNotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
