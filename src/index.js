import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import { observe, piecePosition } from './Game';
import registerServiceWorker from './registerServiceWorker';

observe(knightPosition =>
	observe(bishopPosition =>
		  ReactDOM.render(
    		<Board bishopPosition={piecePosition[1]}
    		knightPosition={piecePosition[0]} />,
    		document.getElementById('root')
 		 )
	)
);

registerServiceWorker();