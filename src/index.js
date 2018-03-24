import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
import { observe } from './components/Game';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  )
);

registerServiceWorker();