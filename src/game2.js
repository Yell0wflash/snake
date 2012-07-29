// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['game', 'grid', 'utils', 'graphics2'], function(Game, Grid, Utils, Graphics2) {
    var Game2;
    return Game2 = (function(_super) {

      __extends(Game2, _super);

      function Game2(selector, settings) {
        if (settings == null) {
          settings = {};
        }
        this.dropFood = __bind(this.dropFood, this);

        Game2.__super__.constructor.call(this, selector, settings);
        this.grid = new Grid(this);
        this.maxFood = 4;
        this.foodItems = null;
        this.graphics = new Graphics2(this, this.grid, $(selector).eq(0));
        this._startGame();
      }

      Game2.prototype.dropFood = function(pos) {
        if (pos == null) {
          pos = Utils.randPair(this.squaresX - 1, this.squaresY - 1);
        }
        this.foodItems.enqueue(pos);
        if (this.foodCount > this.maxFood) {
          return this.foodItems.dequeue();
        }
      };

      return Game2;

    })(Game);
  });

}).call(this);
