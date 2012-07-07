// Generated by CoffeeScript 1.3.3
(function() {
  'import utils';

  'import graph';

  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.TestGraph = (function(_super) {

    __extends(TestGraph, _super);

    function TestGraph() {
      return TestGraph.__super__.constructor.apply(this, arguments);
    }

    TestGraph.prototype.runDijkstras = function(edges, start, ends, expected, message) {
      var dijkstras, graph;
      if (message == null) {
        message = null;
      }
      graph = new Game.Graph(edges);
      dijkstras = graph.dijkstras.apply(graph, [start].concat(__slice.call(ends)));
      this.show(dijkstras, "Result of Dijkstra's algorithm:");
      return this.assert(this.equals(dijkstras, expected), message);
    };

    TestGraph.prototype.testGraphDetails = function() {
      var distance, edgeWeights, graph;
      edgeWeights = [['a', 'b', 2], ['a', 'c', 8], ['a', 'd', 20], ['d', 'c', 9], ['c', 'f', 1], ['d', 'f', 1], ['e', 'e', 0]];
      this.show(edgeWeights, "Edge weights:");
      graph = new Game.Graph(edgeWeights);
      this.show(graph._neighbours, "Internal neighbours object:");
      this.show(graph.vertices(), 'Vertices:');
      this.show(graph._distanceBetween, 'Internal distanceBetween object:');
      distance = graph.distanceBetween(graph.vertices()[0], graph.vertices()[1]);
      return this.show(distance, 'Distance between vertices a and b:');
    };

    TestGraph.prototype.testDijkstrasWithWeights = function() {
      var edgeWeights, message;
      edgeWeights = [['a', 'b', 2], ['a', 'c', 8], ['a', 'd', 20], ['d', 'c', 9], ['c', 'f', 1], ['d', 'f', 1], ['e', 'e', 0]];
      message = "Shortest path from 'a' to 'd'";
      return this.runDijkstras(edgeWeights, 'a', 'd', ['c', 'f', 'd'], message);
    };

    TestGraph.prototype.testDijkstrasWithoutWeights = function() {
      var edges, message;
      edges = [['a', 'b'], ['a', 'c'], ['a', 'd'], ['d', 'c'], ['c', 'f'], ['d', 'f'], ['e', 'e']];
      message = "Shortest path from 'a' to 'd' in a weightless graph.";
      return this.runDijkstras(edges, 'a', 'd', ['d'], message);
    };

    TestGraph.prototype.testDijkstrasWithDuplicateEdges = function() {
      var edgeWeights, message;
      edgeWeights = [['a', 'b', 2], ['a', 'b', 2], ['a', 'b', 2], ['a', 'b', 2], ['a', 'b', 2], ['a', 'c', 8], ['a', 'd', 20], ['a', 'd', 20], ['a', 'd', 20], ['d', 'c', 9], ['c', 'f', 1], ['c', 'f', 1], ['d', 'f', 1], ['d', 'f', 1], ['d', 'f', 1], ['e', 'e', 0], ['e', 'e', 0]];
      message = "Shortest path from 'a' to 'd' with duplicate edges.";
      return this.runDijkstras(edgeWeights, 'a', 'd', ['c', 'f', 'd'], message);
    };

    TestGraph.prototype.testDijkstrasWithMultipleTargets = function() {
      var edgeWeights, message;
      edgeWeights = [['a', 'b', 2], ['a', 'c', 8], ['a', 'd', 20], ['d', 'c', 9], ['c', 'f', 1], ['d', 'f', 1], ['e', 'e', 0]];
      message = "Shortest path from 'a' to 'c', 'd', or 'f'.";
      return this.runDijkstras(edgeWeights, 'a', ['c', 'd', 'f', 'b'], ['b'], message);
    };

    return TestGraph;

  })(Test);

}).call(this);
