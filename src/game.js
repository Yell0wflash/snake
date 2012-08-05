// Generated by CoffeeScript 1.3.3
(function() {

  define(['src/face', 'src/snake', 'src/graphics3'], function(Face, Snake, Graphics3) {
    var Game;
    return Game = (function() {

      function Game(container) {
        this._timeStepRate = 100;
        this._buildCube();
        this._snake = new Snake(this.faces);
        this._graphics = new Graphics3(this.faces, container);
        console.log('constructed');
        window.game = this;
      }

      Game.prototype.run = function() {
        var _this = this;
        return setInterval(function() {
          _this._snake.move();
          return _this._graphics.update();
        }, this._timeStepRate);
      };

      Game.prototype._buildCube = function() {
        var face, index, index2, otherFace, _i, _len, _ref, _results;
        this.faces = [];
        this.faces.push(new Face('x', true));
        this.faces.push(new Face('y', true));
        this.faces.push(new Face('z', true));
        this.faces.push(new Face('x'));
        this.faces.push(new Face('y'));
        this.faces.push(new Face('z'));
        _ref = this.faces;
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          face = _ref[index];
          _results.push((function() {
            var _j, _len1, _ref1, _results1;
            _ref1 = this.faces;
            _results1 = [];
            for (index2 = _j = 0, _len1 = _ref1.length; _j < _len1; index2 = ++_j) {
              otherFace = _ref1[index2];
              if (index2 > index) {
                _results1.push(face.connect(otherFace));
              }
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
