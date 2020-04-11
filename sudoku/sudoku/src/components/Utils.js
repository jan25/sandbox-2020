import _ from "lodash";

export let isIncorrect = (board, coord) => {
  let [x, y] = coord;
  if (x === -1 && y === -1) return;

  let num = board[x][y];
  let rowNums = getRowNums(board, x);
  if (hasDuplicate(rowNums, num)) {
    return true;
  }
  let colNums = getColNums(board, y);
  if (hasDuplicate(colNums, num)) {
    return true;
  }
  let boxNums = getBoxNums(board, x, y);
  if (hasDuplicate(boxNums, num)) {
    return true;
  }

  return false;
};

let getRowNums = (board, x) => {
  return _.filter(_.cloneDeep(board[x]), (num) => num > 0);
};

let getColNums = (board, y) => {
  let colNums = _.map(_.range(board.length), (i) => board[i][y]);
  return _.filter(colNums, (num) => num > 0);
};

let getBoxNums = (board, x, y) => {
  const sz = 3;
  for (let i = 0; i < sz; ++i) {
    for (let j = 0; j < sz; ++j) {
      let [r, c] = [i * sz, j * sz];
      let [rr, cc] = [r + sz, c + sz];
      if (x >= r && y >= c && x < rr && y < cc) {
        let nums = [];
        for (let k = r; k < rr; ++k) {
          for (let l = c; l < cc; ++l) {
            nums.push(board[k][l]);
          }
        }
        return nums;
      }
    }
  }
};

let hasDuplicate = (array, num) => {
  let eq = (n) => n === num;
  return _.findIndex(array, eq) !== _.findLastIndex(array, eq);
};
