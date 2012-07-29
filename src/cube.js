// Generated by CoffeeScript 1.3.3
(function() {

  define(['grid', 'graph'], function(Grid, Graph) {
    var Cube;
    return Cube = (function() {

      function Cube(game, length) {
        var index;
        this.game = game;
        this.length = length != null ? length : 15;
        this.faces = (function() {
          var _i, _results;
          _results = [];
          for (index = _i = 0; _i <= 5; index = ++_i) {
            _results.push(new Grid(game, this.length, this.length));
          }
          return _results;
        }).call(this);
        this.cubeGraph = new Graph([[this.faces[2], this.faces[0]], [this.faces[2], this.faces[1]], [this.faces[2], this.faces[3]], [this.faces[2], this.faces[5]], [this.faces[3], this.faces[4]]]);
      }

      Cube.prototype.registerSquareAt = function() {};

      return Cube;

    })();
  });

}).call(this);
