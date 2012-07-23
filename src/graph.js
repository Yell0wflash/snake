// Generated by CoffeeScript 1.3.3
(function() {
  var __slice = [].slice;

  SNAKE.Graph = (function() {

    function Graph(tuples) {
      if (tuples == null) {
        tuples = [];
      }
      this._edgeWeights = this._assignLabels(tuples);
      this._idMap = this._makeIdMap(tuples);
      this._distanceBetween = this._getDistanceBetween();
      this._neighbours = this._getNeighbours();
    }

    Graph.prototype._getDistanceBetween = function() {
      var isWeightless;
      isWeightless = this._weightlessGraph();
      return this._eachTupleMakeObject(this._edgeWeights, function(obj, vertex1, vertex2, weight) {
        var _ref, _ref1;
        if (isWeightless) {
          weight = 1;
        }
        if ((_ref = obj[vertex1]) == null) {
          obj[vertex1] = {};
        }
        if ((_ref1 = obj[vertex2]) == null) {
          obj[vertex2] = {};
        }
        obj[vertex1][vertex2] = weight;
        return obj[vertex2][vertex1] = weight;
      });
    };

    Graph.prototype._getNeighbours = function() {
      return this._eachTupleMakeObject(this._edgeWeights, function(obj, vertex1, vertex2) {
        var _ref, _ref1;
        if ((_ref = obj[vertex1]) == null) {
          obj[vertex1] = [];
        }
        if ((_ref1 = obj[vertex2]) == null) {
          obj[vertex2] = [];
        }
        if (vertex1 !== vertex2) {
          obj[vertex1].push(vertex2);
          return obj[vertex2].push(vertex1);
        }
      });
    };

    Graph.prototype._makeIdMap = function(tuples) {
      var _this = this;
      return this._eachTupleMakeObject(tuples, function(obj, vertex1, vertex2) {
        obj[_this._toId(vertex1)] = vertex1;
        return obj[_this._toId(vertex2)] = vertex2;
      });
    };

    Graph.prototype._toId = function(datum) {
      return (SNAKE.Utils.equivalenceId(datum)).toString();
    };

    Graph.prototype._assignLabels = function(tuples) {
      var edgeWeights,
        _this = this;
      edgeWeights = [];
      this._eachTuple(tuples, function(vertex1, vertex2, weight) {
        var tuple;
        tuple = [_this._toId(vertex1), _this._toId(vertex2)];
        if (weight) {
          tuple.push(weight);
        }
        return edgeWeights.push(tuple);
      });
      return edgeWeights;
    };

    Graph.prototype._eachTupleMakeObject = function(tuples, callback, obj) {
      var tuple, _i, _len;
      if (obj == null) {
        obj = {};
      }
      for (_i = 0, _len = tuples.length; _i < _len; _i++) {
        tuple = tuples[_i];
        if (false === callback.apply(null, [obj].concat(__slice.call(tuple)))) {
          return;
        }
      }
      return obj;
    };

    Graph.prototype._eachTuple = function(tuples, callback) {
      var tuple, _i, _len;
      for (_i = 0, _len = tuples.length; _i < _len; _i++) {
        tuple = tuples[_i];
        if (false === callback.apply(null, tuple)) {
          return;
        }
      }
    };

    Graph.prototype._weightlessGraph = function() {
      var pair, _i, _len, _ref;
      _ref = this._edgeWeights;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        if (pair.length !== 2) {
          return false;
        }
      }
      return true;
    };

    Graph.prototype._shortestPath = function(previous, source, target) {
      var path;
      path = [];
      while (previous[target]) {
        path.unshift(this._idMap[target]);
        target = previous[target];
      }
      return path;
    };

    Graph.prototype._keysToData = function(dict) {
      var key, newDict;
      newDict = {};
      for (key in dict) {
        newDict[this._idMap[key]] = key;
      }
      return newDict;
    };

    Graph.prototype.distanceBetween = function(vertex1, vertex2) {
      return this._distanceBetween[vertex1][vertex2] || Infinity;
    };

    Graph.prototype.vertices = function() {
      var vertex, _results;
      _results = [];
      for (vertex in this._neighbours) {
        _results.push(vertex);
      }
      return _results;
    };

    Graph.prototype.dijkstras = function() {
      var alt, closest, distance, minDistance, neighbour, pathDistances, previous, source, targetIndex, targets, vertex, vertices, _i, _j, _k, _len, _len1, _len2, _ref, _ref1,
        _this = this;
      source = arguments[0], targets = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!source) {
        return;
      }
      source = this._toId(source);
      targets = targets.map(function(target) {
        return _this._toId(target);
      });
      vertices = this.vertices();
      distance = {};
      previous = {};
      for (_i = 0, _len = vertices.length; _i < _len; _i++) {
        vertex = vertices[_i];
        distance[vertex] = Infinity;
        previous[vertex] = null;
      }
      distance[source] = 0;
      while (vertices.length) {
        closest = vertices[0];
        _ref = vertices.slice(1);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          neighbour = _ref[_j];
          if (distance[neighbour] < distance[closest]) {
            closest = neighbour;
          }
        }
        if (distance[closest] === Infinity) {
          break;
        }
        vertices.splice(vertices.indexOf(closest), 1);
        _ref1 = this._neighbours[closest];
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          neighbour = _ref1[_k];
          if (vertices.indexOf(neighbour) === -1) {
            continue;
          }
          alt = distance[closest] + this.distanceBetween(closest, neighbour);
          if (alt < distance[neighbour]) {
            distance[neighbour] = alt;
            previous[neighbour] = closest;
          }
        }
      }
      if (!targets.length) {
        return this._keysToData(distance);
      }
      pathDistances = targets.map(function(target) {
        return distance[target];
      });
      minDistance = Math.min.apply(null, pathDistances);
      targetIndex = pathDistances.indexOf(minDistance);
      return this._shortestPath(previous, source, targets[targetIndex]);
    };

    return Graph;

  })();

}).call(this);
