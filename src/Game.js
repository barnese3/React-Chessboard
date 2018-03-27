import { squareStates, findSquare } from './SquareStates';

// define starting positions, can easily add all pieces to finish building the game
export let piecePosition = [
	[1, 7], // knight
	[2, 7] // bishop
];
let observer = null;
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
  currentSquare[2] = "full";
  piecePosition[0] = [toX, toY];
  observer(piecePosition[0]);
}

// change old space to empty and new space to full, and display bishop on new space
export function moveBishop(toX, toY) {
  let moveFrom = findSquare(piecePosition[1][0], piecePosition[1][1]);
  moveFrom[2] = "empty";
  currentSquare[2] = "full";
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

  let full = getFullSquares(x, y);
  // console.log(full);

  return (Math.abs(dx) === Math.abs(dy) && squareState[2] === "empty");
}

// check all surrounding pieces of current, if one is full, dont go past
// and if its not in a diagnol from a full square
// all surrounding pieces will be x+1, y-2; x+1, y+1; x-1, y-1; x-1, y+1....get coords of all surrounding pieces

function getFullSquares(x, y) {
  let surroundingSquares = [
    [(x+1), (y-1)],
    [(x+1), (y+1)],
    [(x-1), (y-1)],
    [(x-1), (y+1)]
  ];
    let fullSquares = [];
    for (let i=0; i<squareStates.length; i++) {
      if (squareStates[i][2] === "full") {
        for (let i=0; i<surroundingSquares.length; i++){
          console.log(squareStates[i][0]); //why is this 0?
          if (squareStates[i][0] === surroundingSquares[i][0] && squareStates[i][1] === surroundingSquares[i][1]) {
            fullSquares.push(surroundingSquares[i]);
          }
        }
      }
  }
  return fullSquares;
}

// function jumpPieces() {
//   let fullSquares = [];
//     for (let i=0; i<squareStates.length; i++) {
//       if (squareStates[i][2] === "full") {
//         fullSquares.push(squareStates[i]);
//       }
//   }
//   return fullSquares;
// }

// keep track of all full squares without loop through all square states, in a seperate array......2,5