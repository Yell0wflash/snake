// Generated by CoffeeScript 1.3.3
(function() {
  'import require-jquery';

  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.TestCube = (function(_super) {

    __extends(TestCube, _super);

    function TestCube() {
      return TestCube.__super__.constructor.apply(this, arguments);
    }

    TestCube.before = function() {
      var linkHtml;
      linkHtml = '<link rel="stylesheet" type="text/css" href="../snake.css" />';
      $('head').append(linkHtml);
      return $('body').prepend('<div id="game"></div>');
    };

    TestCube.prototype.testMakeCube = function() {
      var game;
      game = new SNAKE.Game('#game', {
        debugStep: true
      });
      return this.show(game.grid.faces, 'Faces:');
    };

    return TestCube;

  })(Test);

}).call(this);
