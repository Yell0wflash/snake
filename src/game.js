// Generated by CoffeeScript 1.3.3
(function() {

  define(['src/face', 'src/snake', 'src/utils', 'src/graphics3', 'src/constants'], function(Face, Snake, Utils, Graphics3, Const) {
    var Game;
    return Game = (function() {

      function Game(container) {
        this._timeStepRate = 30;
        this._faces = {};
        this._buildCube();
        this._snake = new Snake(this._faces);
        this._graphics = new Graphics3(this._getFaces(), container);
      }

      Game.prototype.run = function() {
        var _this = this;
        return setInterval(function() {
          return _this._graphics.update();
        }, this._timeStepRate);
      };

      Game.prototype._getFaces = function() {
        var face, key, _ref, _results;
        _ref = this._faces;
        _results = [];
        for (key in _ref) {
          face = _ref[key];
          _results.push(face);
        }
        return _results;
      };

      Game.prototype._buildCube = function() {
        var face, index, otherFace, _i, _len, _ref, _results;
        this._faces = [new Face('x', true), new Face('y', true), new Face('z', true), new Face('x'), new Face('y'), new Face('z')];
        _ref = this._faces;
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          face = _ref[index];
          _results.push((function() {
            var _j, _len1, _ref1, _results1;
            _ref1 = this._faces.slice(index);
            _results1 = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              otherFace = _ref1[_j];
              _results1.push(face.connect(otherFace));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      };

      return Game;

    })();
  });

}).call(this);
