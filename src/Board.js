import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Knight from './Knight';
import Bishop from './Bishop';
import BoardSquare from './BoardSquare';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderKnight(x, y)}
          {this.renderBishop(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderKnight(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y ===knightY) {
      return <Knight />;
    }
  }

  renderBishop(x, y) {
    const [bishopX, bishopY] = this.props.bishopPosition;
    if (x === bishopX && y === bishopY) {
      return <Bishop />;
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        height: '97.5vh',
        display: 'flex',
        flexWrap: 'wrap',
        border: "2px solid"
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired,
  bishopPosition: PropTypes.arrayOf( 
    PropTypes.number.isRequired
  ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);