import _ from "lodash";

// const SIZE = 9;

// Grabbed from https://en.wikipedia.org/wiki/Sudoku
const SAMPLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

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
    // TODO actually generate with algorithm
    return _.cloneDeep(SAMPLE);
  }
}
