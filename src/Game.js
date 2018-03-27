import { squareStates, findSquare } from './SquareStates';

// define starting positions, can easily add all pieces to finish building the game
export let piecePosition = [
	[1, 7], // knight
	[2, 7] // bishop
];
let observer = null;
let fullSquares = [];
let currentSquare;


// display pieces on the board
function emitChange() {
  for (let i=0; i<piecePosition.length; i++) {
    observer(piecePosition[i]);
  }
}

export function observe(o) {
  observer = o;
  emitChange();
}

// change old space to empty and new space to full, and display knight on new space
export function moveKnight(toX, toY) {
  let moveFrom = findSquare(piecePosition[0][0], piecePosition[0][1]);
  moveFrom[2] = "empty";
  fullSquares.splice(fullSquares.indexOf(moveFrom), 1);
  currentSquare[2] = "full";
  fullSquares.push(currentSquare);
  piecePosition[0] = [toX, toY];
  observer(piecePosition[0]);
}

// change old space to empty and new space to full, and display bishop on new space
export function moveBishop(toX, toY) {
  let moveFrom = findSquare(piecePosition[1][0], piecePosition[1][1]);
  moveFrom[2] = "empty";
  fullSquares.splice(fullSquares.indexOf(moveFrom), 1);
  currentSquare[2] = "full";
  fullSquares.push(currentSquare);
  piecePosition[1] = [toX, toY];
  observer(piecePosition[1]);
}

// returns a true or false value after checking if the difference in x's is 1 and the difference in y's is 2, therefore creating an L shape on the board.
export function canMoveKnight(toX, toY) {
  const [x, y] = piecePosition[0];
  const dx = toX - x;
  const dy = toY - y;
  // checks if the square you are trying to move to is full or empty
  let squareState = findSquare(toX, toY);
  currentSquare = squareState;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1 && squareState[2] === "empty") ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2 && squareState[2] === "empty");
}

// returns a true or false value after checking if the difference in x's is absolutely equal to the difference in y's, therefore creating a diagonal move.
export function canMoveBishop(toX, toY) {
	const [x, y] = piecePosition[1];
	const dx = Math.abs(toX - x);
 	const dy = Math.abs(toY - y);
  // checks if the square you are trying to move to is full or empty
  let squareState = findSquare(toX, toY);
  currentSquare = squareState;

  // forbids bishop from jumping over pieces  -- this feature is not finished yet (almost!!)
  getFullSquares(x, y);
  // const a = Math.abs(toX - full[0]);
  // const b = Math.abs(toY - full[1]);
  // (Math.abs(a) === Math.abs(b) && squareState[2] === "empty");

  return (Math.abs(dx) === Math.abs(dy) && squareState[2] === "empty");
}

// checks for full square surrounding the piece you are trying to move so that you cannot jump over a piece if the rules do not permit it
function getFullSquares(x, y) {
  let surroundingSquares = [
    [(x+1), (y-1)],
    [(x+1), (y+1)],
    [(x-1), (y-1)],
    [(x-1), (y+1)]
  ];
    let surroundingFullSquaresX;
    let surroundingFullSquaresY;
      for (let i=0; i<surroundingSquares.length; i++){
        for (let j=0; j<fullSquares.length; j++) {
          if (fullSquares[j][0] === surroundingSquares[i][0] && fullSquares[j][1] === surroundingSquares[i][1]) {
            surroundingFullSquaresX = surroundingSquares[i][0];
            surroundingFullSquaresY = surroundingSquares[i][1];
            break;
          }
        }
      }
    return [surroundingFullSquaresX, surroundingFullSquaresY];
  }

// initially checks for all full squares
function fullSqauresArray() {
  for (let i=0; i<squareStates.length; i++) {
    if (squareStates[i][2] === "full") {
      fullSquares.push(squareStates[i]);
    }
  }
}

fullSqauresArray();