// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SNAKE.Grid = (function() {

    function Grid(game, snake, squaresX, squaresY) {
      this.game = game;
      this.snake = snake;
      this.squaresX = squaresX != null ? squaresX : 25;
      this.squaresY = squaresY != null ? squaresY : 15;
      this.dropFood = __bind(this.dropFood, this);

      this._squareToEdges = __bind(this._squareToEdges, this);

      this.graphics = null;
      this.squareWidth = 15;
      this.squareHeight = 15;
      this.squareTypes = ['food', 'snake'];
      this.maxFood = 4;
      this.foodCount = 0;
      this.foodItems = null;
      this.world = null;
    }

    Grid.prototype._squareToEdges = function(pos) {
      var edges,
        _this = this;
      if (this.squareHasType('snake', pos) && !pos.equals(this.snake.head)) {
        return;
      }
      edges = [];
      this.eachAdjacentPosition(pos, function(adjacentPos, direction) {
        if (_this.squareHasType('snake', adjacentPos)) {
          return;
        }
        return edges.push([pos.toString(), adjacentPos.toString()]);
      });
      return edges;
    };

    Grid.prototype._unregisterAllTypesAt = function(pos) {
      var type, _i, _len, _ref, _results;
      _ref = this.squareTypes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        _results.push(this.unregisterSquareAt(pos, type));
      }
      return _results;
    };

    Grid.prototype.makeWorld = function() {
      var _this = this;
      this.eachSquare(function(pos) {
        return _this._unregisterAllTypesAt(pos);
      });
      return this.world = (function() {
        var _i, _ref, _results;
        _results = [];
        for (_i = 0, _ref = this.squaresX; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (_j = 0, _ref1 = this.squaresY; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; 0 <= _ref1 ? _j++ : _j--) {
              _results1.push({});
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }).call(this);
    };

    Grid.prototype.moduloBoundaries = function(pair) {
      pair.x %= this.squaresX;
      pair.y %= this.squaresY;
      if (pair.x < 0) {
        pair.x = this.squaresX - 1;
      }
      if (pair.y < 0) {
        pair.y = this.squaresY - 1;
      }
      return pair;
    };

    Grid.prototype.eachSquare = function(callback) {
      var column, pos, square, x, y, _i, _len, _ref, _results;
      if (!this.world) {
        return;
      }
      _ref = this.world;
      _results = [];
      for (x = _i = 0, _len = _ref.length; _i < _len; x = ++_i) {
        column = _ref[x];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (y = _j = 0, _len1 = column.length; _j < _len1; y = ++_j) {
            square = column[y];
            pos = new SNAKE.Pair(x, y);
            _results1.push(callback(pos, square));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Grid.prototype.eachAdjacentPosition = function(pos, callback) {
      var adjacentPos, direction, normalizedPos, positions;
      positions = {
        down: new SNAKE.Pair(pos.x, pos.y + 1),
        right: new SNAKE.Pair(pos.x + 1, pos.y),
        up: new SNAKE.Pair(pos.x, pos.y - 1),
        left: new SNAKE.Pair(pos.x - 1, pos.y)
      };
      for (direction in positions) {
        adjacentPos = positions[direction];
        normalizedPos = this.moduloBoundaries(adjacentPos);
        if (false === callback(normalizedPos, direction)) {
          return;
        }
      }
    };

    Grid.prototype.squareAt = function(pos, type, value) {
      if (arguments.length === 1) {
        return this.world[pos.x][pos.y];
      }
      if (arguments.length === 2) {
        return this.world[pos.x][pos.y][type];
      }
      return this.world[pos.x][pos.y][type] = value;
    };

    Grid.prototype.setup = function(graphics) {
      return this.graphics = graphics;
    };

    Grid.prototype.isEmptySquare = function(square) {
      var type, _i, _len, _ref;
      _ref = this.squareTypes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        if (square[type]) {
          return false;
        }
      }
      return true;
    };

    Grid.prototype.registerFoodAt = function(pos) {
      if (!this.registerSquareAt(pos, 'food')) {
        return false;
      }
      this.foodCount += 1;
      return true;
    };

    Grid.prototype.unregisterFoodAt = function(pos) {
      if (!this.unregisterSquareAt(pos, 'food')) {
        return false;
      }
      this.foodCount -= 1;
      return true;
    };

    Grid.prototype.registerSquareAt = function(pos, type) {
      if (this.squareAt(pos, type)) {
        return false;
      }
      this.squareAt(pos, type, true);
      return true;
    };

    Grid.prototype.unregisterSquareAt = function(pos, type) {
      if (!this.squareHasType(type, pos)) {
        return false;
      }
      this.graphics.hideEntity(this.squareAt(pos, type));
      this.squareAt(pos, type, null);
      return true;
    };

    Grid.prototype.squareHasFood = function(pos) {
      if (!pos) {
        return false;
      }
      return this.squareHasType('food', pos);
    };

    Grid.prototype.moveSquare = function(start, end, type) {
      this.squareAt(end, type, this.squareAt(start, type));
      return this.squareAt(start, type, null);
    };

    Grid.prototype.squareHasType = function(type, pos) {
      return (this.squareAt(pos, type)) != null;
    };

    Grid.prototype.visibleFood = function() {
      var foodPos, foodPositions, _i, _len, _ref;
      foodPositions = [];
      _ref = this.foodItems._queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        foodPos = _ref[_i];
        if (this.graphics.entityIsVisible(this.squareAt(foodPos).food)) {
          foodPositions.push(foodPos);
        }
      }
      return foodPositions;
    };

    Grid.prototype.dropFood = function(pos) {
      if (pos == null) {
        pos = SNAKE.Utils.randPair(this.squaresX - 1, this.squaresY - 1);
      }
      this.foodItems.enqueue(pos);
      if (this.foodCount > this.maxFood) {
        return this.foodItems.dequeue();
      }
    };

    Grid.prototype.toGraph = function() {
      var graphEdges,
        _this = this;
      graphEdges = [];
      this.eachSquare(function(pos) {
        return SNAKE.Utils.concat(graphEdges, _this._squareToEdges(pos));
      });
      return graphEdges;
    };

    return Grid;

  })();

}).call(this);
