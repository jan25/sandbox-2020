import _ from "lodash";
import data from "../generator/puzzles.json";

// const SIZE = 9;

// Grabbed from https://en.wikipedia.org/wiki/Sudoku
// const SAMPLE = [
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],
//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],
//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9],
// ];

export default class Generator {
  generate() {
    let board = this._generate();
    board = this.shuffleCols(board);
    board = this.shuffleRows(board);
    return board;
  }

  shuffleRows(board) {
    let rows = _.shuffle(_.range(3));
    let newBoard = [];
    for (let i of rows) {
      let row = _.slice(board, i * 3, i * 3 + 3);
      newBoard.push(...row);
    }
    return newBoard;
  }

  shuffleCols(board) {
    let cols = _.shuffle(_.range(3));
    let newBoard = _.range(9).map(() => []);
    for (let i of cols) {
      _.range(3).forEach((j) => {
        _.range(9).forEach((k) => {
          newBoard[k].push(board[k][i * 3 + j]);
        });
      });
    }
    return newBoard;
  }

  _generate() {
    // TODO actually write my own algorithm
    let puzzles = data["puzzles"];
    let pi = _.random(0, puzzles.length - 1);
    return puzzles[pi];
  }
}

// const TEST = [
//   [0, 1, 2, 4, 6, 9, 8, 5, 3],
//   [9, 8, 6, 1, 3, 5, 2, 4, 7],
//   [3, 4, 5, 2, 7, 8, 1, 9, 6],
//   [0, 9, 1, 3, 5, 7, 6, 8, 4],
//   [5, 6, 7, 8, 4, 1, 3, 2, 9],
//   [4, 0, 8, 6, 9, 2, 7, 1, 5],
//   [1, 7, 4, 9, 8, 3, 5, 6, 2],
//   [8, 5, 9, 7, 2, 6, 4, 3, 1],
//   [6, 2, 3, 5, 1, 4, 9, 7, 8],
// ];

// const TEST2 = [
//   [1, 7, 4, 9, 8, 3, 5, 6, 2],
//   [8, 5, 9, 7, 2, 6, 4, 3, 1],
//   [6, 2, 3, 5, 1, 4, 9, 7, 8],
//   [0, 1, 2, 4, 6, 9, 8, 5, 3],
//   [9, 8, 6, 1, 3, 5, 2, 4, 7],
//   [3, 4, 5, 2, 7, 8, 1, 9, 6],
//   [0, 9, 1, 3, 5, 7, 6, 8, 4],
//   [5, 6, 7, 8, 4, 1, 3, 2, 9],
//   [4, 0, 8, 6, 9, 2, 7, 1, 5],
// ];
