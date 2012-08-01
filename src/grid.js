// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['src/pair', 'src/utils', 'src/world'], function(Pair, Utils, World) {
    var Grid;
    return Grid = (function(_super) {

      __extends(Grid, _super);

      function Grid(game, squaresX, squaresY) {
        this.game = game;
        this.squaresX = squaresX != null ? squaresX : 25;
        this.squaresY = squaresY != null ? squaresY : 15;
        this.dropFood = __bind(this.dropFood, this);

        this._squareToEdges = __bind(this._squareToEdges, this);

        this.graphics = null;
        this.squareWidth = 15;
        this.squareHeight = 15;
        this.squareTypes = ['food', 'snake'];
        this._world = null;
      }

      Grid.prototype._squareToEdges = function(pos) {
        var edges,
          _this = this;
        if (this.squareHasType('snake', pos)) {
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

      Grid.prototype.dropFood = function(pos) {
        if (pos == null) {
          pos = Utils.randPair(this.squaresX - 1, this.squaresY - 1);
        }
        this.game.foodItems.enqueue(pos);
        if (this.foodCount > this.maxFood) {
          return this.game.foodItems.dequeue();
        }
      };

      Grid.prototype.makeWorld = function() {
        var _this = this;
        this.eachSquare(function(pos) {
          return _this._unregisterAllTypesAt(pos);
        });
        return this._world = (function() {
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
        return Grid.__super__.moduloBoundaries.call(this, pair);
      };

      Grid.prototype.eachSquare = function(callback) {
        var column, pos, square, x, y, _i, _len, _ref, _results;
        if (!this._world) {
          return;
        }
        _ref = this._world;
        _results = [];
        for (x = _i = 0, _len = _ref.length; _i < _len; x = ++_i) {
          column = _ref[x];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (y = _j = 0, _len1 = column.length; _j < _len1; y = ++_j) {
              square = column[y];
              pos = new Pair(x, y);
              _results1.push(callback(pos, square));
            }
            return _results1;
          })());
        }
        return _results;
      };

      Grid.prototype.squareAt = function(pos, type, value) {
        if (type === void 0) {
          return this._world[pos.x][pos.y];
        }
        if (value === void 0) {
          return this._world[pos.x][pos.y][type];
        }
        return this._world[pos.x][pos.y][type] = value;
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

      Grid.prototype.moveSquare = function(start, end, type) {
        this.squareAt(end, type, this.squareAt(start, type));
        return this.squareAt(start, type, null);
      };

      Grid.prototype.toGraph = function() {
        var graphEdges,
          _this = this;
        graphEdges = [];
        this.eachSquare(function(pos) {
          return Utils.concat(graphEdges, _this._squareToEdges(pos));
        });
        return graphEdges;
      };

      return Grid;

    })(World);
  });

}).call(this);
