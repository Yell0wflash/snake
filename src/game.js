// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'src/snake', 'src/foodqueue'], function($, Snake, FoodQueue) {
    var Game;
    return Game = (function() {

      function Game(selector, settings) {
        var defaults, option, value;
        if (settings == null) {
          settings = {};
        }
        this._gameLoop = __bind(this._gameLoop, this);

        this.foodCount = 0;
        this.stepCount = 0;
        this.stepsPerFood = 20;
        this.timeStepRate = 100;
        this.grid = null;
        this.graphics = null;
        this.gameIntervalID = null;
        defaults = {
          debugPrint: false,
          debugStep: false
        };
        for (option in defaults) {
          value = defaults[option];
          this[option] = value;
          if (settings[option]) {
            this[option] = settings[option];
          }
        }
        this.snake = new Snake(this);
      }

      Game.prototype._startGame = function() {
        this.grid.makeWorld();
        this.foodCount = 0;
        this.foodItems = new FoodQueue(this.grid);
        this.snake.setup(this.grid);
        this.stepCount = 0;
        if (this.debugStep) {
          return this.setupGameStep();
        }
        clearInterval(this.gameIntervalID);
        this.gameIntervalID = setInterval(this._gameLoop, this.timeStepRate);
        return this._gameLoop();
      };

      Game.prototype._gameLoop = function() {
        if ((this.stepCount % this.stepsPerFood) === 0) {
          this.grid.dropFood();
        }
        this.snake.move();
        this.graphics.update();
        return this.stepCount += 1;
      };

      Game.prototype.visibleFood = function() {
        var foodPos, foodPositions, _i, _len, _ref;
        foodPositions = [];
        _ref = this.foodItems._queue;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          foodPos = _ref[_i];
          if (this.graphics.entityIsVisible(this.grid.squareAt(foodPos).food)) {
            foodPositions.push(foodPos);
          }
        }
        return foodPositions;
      };

      Game.prototype.restart = function() {
        this.snake = this.grid.snake = new Snake(this);
        this.grid.makeWorld();
        return this._startGame();
      };

      Game.prototype.setupGameStep = function() {
        var _this = this;
        $(window).keydown(function(event) {
          if (event.keyCode === 83) {
            return _this._gameLoop();
          }
        });
        return console.warn('Debug stepping is active. Press s to move a time step.');
      };

      Game.prototype.log = function(message) {
        if (!this.debugPrint) {
          return;
        }
        return console.log(message);
      };

      return Game;

    })();
  });

}).call(this);
