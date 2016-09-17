import React from 'react';
import ReactDOM from 'react-dom';
import socketClient from 'socket.io-client';

import configureStore from 'redux/configureStore';
import dispatchServerActions from 'redux/utils/dispatchServerActions';
import dispatchNewGameAction from 'redux/utils/dispatchNewGameAction';
// import { newGame } from 'redux/modules/game';

import { Root } from './containers';
import './styles/app.scss';

if (module.hot) {
  module.hot.accept();
}

const socket = socketClient('http://localhost:3000');
const store = configureStore(undefined, socket);
dispatchServerActions(store, socket);
dispatchNewGameAction(store, socket);

// store.dispatch(newGame({
//   yourName: 'Inooid',
//   opponentName: 'OpponentName',
//   isPlayerStarting: Math.random() >= 0.5,
// }));

ReactDOM.render(
  <Root store={store} socket={socket} />,
  document.getElementById('app')
);
