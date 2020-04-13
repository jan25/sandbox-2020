## sūdoku

Sudoku game and generator written in Javascript.

The goal of Sudoku is to fill a 9×9 grid with numbers so that each row, column and 3×3 section contain all of the digits between 1 and 9.

Click here to solve puzzles 👉👉👉[jan25/sūdoku](https://jan25.github.io/sandbox-2020) 👈👈👈 🎉🎉

## Develop

```
cd path/to/sudoku

npm install
npm start

npm run predeploy && <serve-build-assets-with-favorite-tool>

npm run deploy
```

### Few next things todo

- ~~Remove '0' number from empty cells~~
- ~~Highlight cell when dragging to drop~~
- ~~end of game: blinking numbers with 'Well Done' message. Also, with 'new game' button~~
- ~~Put numbers strip on all 4 sides of grid~~
- ~~Info dialog~~ fix console errors
- Deploy to gh pages on custom /sudoku folder
- Implement custom puzzle generator logic (e.g. https://dlbeer.co.nz/articles/sudoku.html)
- Mobile site support
- Add emojis around Well done message. or anywhere else
- Group puzzles in difficulty levels. And add chooser in UI
