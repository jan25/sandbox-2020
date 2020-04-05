let WIDTH = 400;
let HEIGHT = 400;
// let WIDTH = 150;
// let HEIGHT = 150;
let PAD = 5;
let CELL_WIDTH = 40;
let CELL_HEIGHT = 40;
let WALL_THICKNESS = 4;
let rows, cols;
let grid;

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas");

  cols = parseInt((WIDTH - PAD) / CELL_WIDTH);
  rows = parseInt((HEIGHT - PAD) / CELL_HEIGHT);
  grid = new Grid(rows, cols);
  grid.init();
}

function draw() {
  grid.draw();
}

// function dfs(cell) {
//   if (cell.visited) {
//     return;
//   }
//   cell.current = true;
//   cell.visited = true;
//   let neighbors = cell.getNeighbors();
//   for (let neighbor of neighbors) {
//     dfs(neighbor);
//   }
//   cell.visited = false;
// }

class Grid {
  constructor(rows, cols) {
    this.cells = [];
    for (let i = 0; i < rows; ++i) {
      let row = [];
      for (let j = 0; j < cols; ++j) {
        row.push(new Cell(i, j));
      }
      this.cells.push(row);
    }
  }

  draw() {
    for (let row of this.cells) {
      for (let cell of row) {
        cell.draw();
      }
    }
  }

  init() {
    this.dfs(0, 0);
    // for (let i = 0; i < rows; ++i) {
    //   this.cells[i][i].visited = true;
    // }
  }

  dfs(i, j, parentCell) {
    this._dfs(i, j, parentCell);
    // setTimeout(() => this._dfs(i, j, parentCell), 1000);
  }

  _dfs(i, j, parentCell) {
    let cell = this.cells[i][j];
    if (cell.visited) {
      return;
    }
    console.log(cell);
    if (parentCell) {
      parentCell.current = false;
    }
    cell.current = true;
    cell.visited = true;
    let neighbors = this._getNeighbors(i, j);
    let ks = _.shuffle(_.range(4));
    for (let k of ks) {
      if (neighbors[k]) {
        if (!neighbors[k].visited) {
          cell.walls[k] = neighbors[k].walls[(k + 2) % 4] = false;
          this.dfs(neighbors[k].i, neighbors[k].j, cell);
        }
      }
    }
  }

  _getNeighbors(i, j) {
    let neighbors = [];
    for (let dir of [
      [0, -1], // this order must match Cell.walls order
      [1, 0],
      [0, 1],
      [-1, 0],
    ]) {
      let ni = i + dir[0];
      let nj = j + dir[1];
      if (ni >= 0 && nj >= 0 && ni < rows && nj < cols) {
        neighbors.push(this.cells[ni][nj]);
      } else {
        neighbors.push(null);
      }
    }
    print(i, j, neighbors);
    return neighbors;
  }
}

class Corner {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    this.x = PAD + i * CELL_WIDTH;
    this.y = PAD + j * CELL_HEIGHT;

    this.visited = false;
    this.current = false;

    // up, right, down, left
    this.walls = [true, true, true, true];

    this.corners = [];
    for (let dir of [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]) {
      this.corners.push(
        new Corner(this.x + CELL_WIDTH * dir[0], this.y + CELL_HEIGHT * dir[1])
      );
    }
  }

  draw() {
    strokeWeight(WALL_THICKNESS / 2);
    for (let i = 0; i < 4; ++i) {
      if (!this.walls[i]) {
        stroke("green");
      }

      let c1 = this.corners[i];
      let c2 = this.corners[(i + 1) % 4];
      line(c1.x, c1.y, c2.x, c2.y);
      stroke("black");
    }

    // reset to default
    strokeWeight(1);

    noStroke();
    if (this.current) {
      fill("blue");
    } else if (this.visited) {
      fill("green");

      // fill("yellow");
    }

    let c1 = this.corners[0];
    rectMode(CENTER);

    let wallPad = WALL_THICKNESS / 2;
    rect(
      c1.x + CELL_WIDTH / 2,
      c1.y + CELL_HEIGHT / 2,
      CELL_WIDTH - wallPad,
      CELL_HEIGHT - wallPad
    );

    noFill();
    stroke("black");
  }
}
