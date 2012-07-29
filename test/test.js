// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Test = (function() {

    function Test() {
      this._runTests = __bind(this._runTests, this);
      if (typeof Object.getPrototypeOf !== 'function') {
        if (typeof 'test'.__proto__ === 'object') {
          Object.getPrototypeOf = function(object) {
            return object.__proto__;
          };
        } else {
          Object.getPrototypeOf = function(object) {
            return object.constructor.prototype;
          };
        }
      }
      this._outputBuffer = [];
      this["class"] = (Object.getPrototypeOf(this)).constructor;
      this._origBefore = this.before;
      this._origAfter = this.after;
      this._runTests();
    }

    Test.before = function(start) {
      return start();
    };

    Test.after = function(start) {
      return start();
    };

    Test.prototype._formatTestName = function(name) {
      if (name.substring(0, 4).toLowerCase() === 'test') {
        name = name.substring(4);
      }
      name = name.replace(/([A-Z])/g, function(match, group1) {
        return " " + group1;
      });
      return name.substring(1);
    };

    Test.prototype._typeOf = function(value) {
      var type;
      type = typeof value;
      if (type === 'object') {
        if (!value) {
          return 'null';
        }
        if (value instanceof Array) {
          type = 'array';
        }
      }
      return type;
    };

    Test.prototype._equalArrays = function(array1, array2) {
      var elem, index, _i, _len;
      if (array1.length !== array2.length) {
        return;
      }
      for (index = _i = 0, _len = array1.length; _i < _len; index = ++_i) {
        elem = array1[index];
        if (!this.equals(elem, array2[index])) {
          return false;
        }
      }
      return true;
    };

    Test.prototype._equalObjects = function(obj1, obj2) {
      var prop;
      for (prop in obj1) {
        if (typeof obj2[prop] === 'undefined') {
          return false;
        }
      }
      for (prop in obj1) {
        if (obj1[prop]) {
          switch (typeof obj1[prop]) {
            case 'object':
              if (!this._equalObjects(obj1[prop], obj2[prop])) {
                return false;
              }
              break;
            case 'function':
              if (typeof obj2[prop] === 'undefined') {
                return false;
              }
              if (obj1[prop] !== obj2[prop]) {
                return false;
              }
              break;
            default:
              if (obj1[prop] !== obj2[prop]) {
                return false;
              }
          }
        } else if (obj2[prop]) {
          return false;
        }
      }
      for (prop in obj2) {
        if (typeof obj1[prop] === 'undefined') {
          return false;
        }
      }
      return true;
    };

    Test.prototype._runTests = function() {
      var _this = this;
      if (!this._formatTestName(this["class"].name)) {
        return;
      }
      return this["class"].before(function() {
        var prop;
        _this._writeModuleName("Testing module: " + (_this._formatTestName(_this["class"].name)));
        console.warn("Testing module: " + (_this._formatTestName(_this["class"].name)));
        console.log('');
        for (prop in _this) {
          if (prop.substring(0, 4) === 'test' && typeof _this[prop] === 'function') {
            _this._writeTestName("Running test: " + (_this._formatTestName(prop)));
            console.warn("Running test: " + (_this._formatTestName(prop)));
            try {
              if (typeof _this.before === "function") {
                _this.before();
              }
              _this[prop]();
              if (typeof _this.after === "function") {
                _this.after();
              }
            } catch (error) {
              _this._writeError(error.message);
              _this._flushBuffer();
              throw error;
            }
            console.log('');
          }
        }
        return _this["class"].after(function() {
          console.log('');
          return _this._flushBuffer();
        });
      });
    };

    Test.prototype._write = function(templateName, string) {
      var template;
      template = document.getElementById("tmpl-" + templateName);
      return this._outputBuffer.push(Mustache.render(template.innerHTML, {
        text: string
      }));
    };

    Test.prototype._writeModuleName = function(string) {
      return this._write('module-title', string);
    };

    Test.prototype._writeTestName = function(string) {
      return this._write('test-title', string);
    };

    Test.prototype._writeMessage = function(string) {
      return this._write('message', string);
    };

    Test.prototype._writeError = function(string) {
      return this._write('error', string);
    };

    Test.prototype._flushBuffer = function() {
      var results;
      results = document.createElement('DIV');
      results.className = 'test-results';
      results.innerHTML = this._outputBuffer.join('');
      document.body.appendChild(results);
      setTimeout(function() {
        return window.scroll(0, document.body.scrollHeight);
      }, 0);
      return this._outputBuffer = [];
    };

    Test.prototype.show = function(value, message) {
      if (!(arguments.length > 0)) {
        return;
      }
      if (message) {
        this._writeMessage(message);
      }
      if (message) {
        console.log(message);
      }
      this._writeMessage(value);
      return console.log(value);
    };

    Test.prototype.assert = function(bool, message) {
      var callerLine, clean, err, errorMessage, getErrorObject, index;
      if (bool) {
        return;
      }
      getErrorObject = function() {
        try {
          throw Error('');
        } catch (err) {
          return err;
        }
      };
      err = getErrorObject();
      callerLine = err.stack.split('\n')[4];
      index = callerLine.indexOf("at ");
      clean = callerLine.slice(index + 2, callerLine.length).split(':')[2];
      errorMessage = "" + clean + ": Test failed";
      if (message) {
        errorMessage += ": " + message;
      }
      this._writeError(errorMessage);
      return console.error(errorMessage);
    };

    Test.prototype.equals = function(value1, value2) {
      var type1, type2;
      type1 = this._typeOf(value1);
      type2 = this._typeOf(value2);
      if (type1 !== type2) {
        return false;
      }
      if (type1 === 'object' && type2 === 'object') {
        return this._equalObjects(value1, value2);
      }
      if (type1 === 'array' && type2 === 'array') {
        return this._equalArrays(value1, value2);
      }
      return value1 === value2;
    };

    return Test;

  })();

}).call(this);
