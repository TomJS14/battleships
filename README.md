<!-- @format -->

# battleships

1. Game.js for the game logic
2. Render.js for rendering the board
3. main.js for the game loop, setting up players, positions, attacks etc.

NEXT TO DO - Set flag for win and turn off event listeners if won

BUG

Player boards need to have global scope
However destructuring in the initialisation is causing a redeclaration issue

The boards don't reset their state correctly unless given global scope (In the current implementation)

# To do today

1. Fix issue where old game state perists (Dropped array and dom)

https://www.wallpaperflare.com/white-and-gray-battleship-the-sky-water-clouds-sea-mountains-wallpaper-eefj/download

# to do after

2. Reset shipyyard when game is reset - create DOM in JS instead of HTML (Clear the dropped array)
3. Update messages between shots and as game is started
4. Update styling of shots
5. Allow ships to be 'flipped' to horizontal / vertical
