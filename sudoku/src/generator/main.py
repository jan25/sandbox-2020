import sys
import json
from sudokutools.generate import generate

sys.setrecursionlimit(10000)

NUM_PUZZLES = 25


def to_2d_matrix(p):
    mat = []
    for i in range(0, 81, 9):
        row = list(map(int, list(p[i:i + 9])))
        mat.append(row)
    return mat


def generate_puzzles():
    for _ in range(NUM_PUZZLES):
        puzzle = generate(min_count=17)
        yield to_2d_matrix(puzzle.encode())


if __name__ == '__main__':
    puzzles = [p for p in generate_puzzles()]
    js = {'puzzles': puzzles}
    js_str = json.dumps(js, separators=(',', ':'))
    with open('puzzles.json', 'w') as f:
        f.write(js_str)