(function() {
  var graphics, grid, snake;

  snake = new Game.Snake;

  grid = new Game.Grid(snake);

  graphics = new Game.Graphics(grid);

  grid.startGame();

}).call(this);
