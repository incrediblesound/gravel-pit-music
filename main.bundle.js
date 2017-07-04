/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function () {
  function Listener() {
    _classCallCheck(this, Listener);
  }

  _createClass(Listener, [{
    key: "setProp",
    value: function setProp(action) {
      this[action.property] = action.value;
    }
  }]);

  return Listener;
}();

exports.default = Listener;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValueInput = __webpack_require__(22);

var _ValueInput2 = _interopRequireDefault(_ValueInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControlValue = function () {
  function ControlValue(ctx, x, y, text, initialValue, maxValue, cb) {
    _classCallCheck(this, ControlValue);

    this.context = ctx;
    this.x = x;
    this.y = y;
    this.text = text;
    this.valueInput = new _ValueInput2.default({
      ctx: ctx, x: x + 80, y: y, initialValue: initialValue, maxValue: maxValue, cb: cb
    });
  }

  _createClass(ControlValue, [{
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      this.valueInput.handleClick(x, y, innerX, innerY);
    }
  }, {
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 120, 40);
      this.context.clearRect(this.x + 1, this.y + 1, 118, 38);
      this.context.fillText(this.text, this.x + 5, this.y + 25, 80);
      this.valueInput.render();
    }
  }]);

  return ControlValue;
}();

exports.default = ControlValue;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bassControlFunction = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

var _InstrumentControlValue = __webpack_require__(1);

var _InstrumentControlValue2 = _interopRequireDefault(_InstrumentControlValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeySynth = function (_Listener) {
  _inherits(KeySynth, _Listener);

  function KeySynth(ctx) {
    _classCallCheck(this, KeySynth);

    var _this = _possibleConstructorReturn(this, (KeySynth.__proto__ || Object.getPrototypeOf(KeySynth)).call(this));

    _this.name = 'bass';
    _this.volume = 8;
    _this.context = ctx;
    _this.oscillators = {};
    _this.filterValue = 1;
    _this.playing = false;
    return _this;
  }

  _createClass(KeySynth, [{
    key: 'stopAll',
    value: function stopAll() {
      if (!this.oscillators.osc1) return;
      this.oscillators.gain[0].gain.setTargetAtTime(0, this.context.currentTime + 0.05, 0.1);
      this.oscillators.gain[1].gain.setTargetAtTime(0, this.context.currentTime + 0.05, 0.1);
      this.oscillators.gain[2].gain.setTargetAtTime(0, this.context.currentTime + 0.05, 0.1);
      this.oscillators.osc1.stop(this.context.currentTime + 1);
      this.oscillators.osc2.stop(this.context.currentTime + 1);
      this.oscillators.osc3.stop(this.context.currentTime + 1);
      this.oscillators = {};
      this.playing = false;
    }
  }, {
    key: 'makeOscillator',
    value: function makeOscillator(waveform) {
      var osc = this.context.createOscillator();
      osc.type = waveform;
      return osc;
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators(note, oct) {
      var _this2 = this;

      var osc1 = this.makeOscillator('triangle');
      var osc2 = this.makeOscillator('sawtooth');
      var osc3 = this.makeOscillator('sawtooth');
      var gain = [this.context.createGain(), this.context.createGain(), this.context.createGain()];
      var filters = [this.context.createBiquadFilter(), this.context.createBiquadFilter()];
      filters[0].frequency.value = this.filterValue * 1000;
      filters[1].frequency.value = this.filterValue * 1000;

      osc1.connect(gain[0]);
      osc2.connect(filters[0]);
      osc3.connect(filters[1]);
      filters[0].connect(gain[1]);
      filters[1].connect(gain[2]);
      gain.forEach(function (g) {
        g.gain.value = _this2.volume * 0.1 - _this2.filterValue * 0.05;
        g.connect(_this2.context.destination);
      });

      return [osc1, osc2, osc3, gain, filters];
    }
  }, {
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step,
          note = _ref.note,
          hold = _ref.hold;

      if (step && !hold) {
        this.stopAll();

        var _getOscillators = this.getOscillators(note, step),
            _getOscillators2 = _slicedToArray(_getOscillators, 5),
            osc1 = _getOscillators2[0],
            osc2 = _getOscillators2[1],
            osc3 = _getOscillators2[2],
            gain = _getOscillators2[3],
            filters = _getOscillators2[4];

        this.oscillators = {
          osc1: osc1, osc2: osc2, osc3: osc3,
          gain: gain, filters: filters
        };
        filters[0].frequency.setTargetAtTime(0, this.context.currentTime + 0.02, 0.2);
        filters[1].frequency.setTargetAtTime(0, this.context.currentTime + 0.02, 0.2);
        osc1.start();
        osc2.start();
        osc3.start();
        this.playing = true;
      }
      if (step && this.playing || hold && step && this.playing && this.oscillators.osc1) {
        this.oscillators.osc1.frequency.value = 55 * step;
        this.oscillators.osc2.frequency.value = 55 * step;
        this.oscillators.osc3.frequency.value = 110 * step;
        this.oscillators.osc1.detune.value = 99 * note;
        this.oscillators.osc2.detune.value = 101 * note;
        this.oscillators.osc3.detune.value = 100 * note;
      }
      if (!step) {
        this.stopAll();
      }
    }
  }]);

  return KeySynth;
}(_Listener3.default);

exports.default = KeySynth;
var bassControlFunction = exports.bassControlFunction = function bassControlFunction(state, modules, moduleMap, ctx, x, y) {
  var initialVolume = state.instruments.bass.volume;
  var volume = new _InstrumentControlValue2.default(ctx, x, y, 'Volume', initialVolume, 10, function (value) {
    state.instruments.bass.setProp({ property: 'volume', value: value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  var initialFilter = state.instruments.bass.filterValue;
  var filter = new _InstrumentControlValue2.default(ctx, x + 3 * 40, y, 'Filter', initialFilter, 10, function (value) {
    state.instruments.bass.setProp({ property: 'filterValue', value: value });
  });
  modules.push(filter);
  moduleMap['3/0'] = filter;
  moduleMap['4/0'] = filter;
  moduleMap['5/0'] = filter;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Options = function () {
  function Options(_ref) {
    var options = _ref.options,
        currentValue = _ref.currentValue,
        cb = _ref.cb,
        ctx = _ref.ctx,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Options);

    this.context = ctx;
    this.idx = currentValue !== undefined ? options.indexOf(currentValue) : 0;
    this.options = options;
    this.callBack = cb;
    this.x = x;
    this.y = y;
  }

  _createClass(Options, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 80, 40);
      this.context.clearRect(this.x + 1, this.y + 1, 78, 38);
      var text = this.options[this.idx];
      var textWidth = Math.ceil(this.context.measureText(text).width);
      var offset = 40 - textWidth / 2;
      this.context.fillText(text, this.x + offset, this.y + 25, 39);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.idx = (this.idx + 1) % this.options.length;
      this.render();
      this.callBack(this.options[this.idx]);
    }
  }]);

  return Options;
}();

exports.default = Options;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COLOR = exports.COLOR = 'white';
var LOOP_LENGTH = exports.LOOP_LENGTH = 16;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fmControlFunction = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

var _InstrumentControlValue = __webpack_require__(1);

var _InstrumentControlValue2 = _interopRequireDefault(_InstrumentControlValue);

var _InstrumentControlOptions = __webpack_require__(21);

var _InstrumentControlOptions2 = _interopRequireDefault(_InstrumentControlOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fmModeMethods = {
  'parallel': 'setupOscillators_A',
  'vertical': 'setupOscillators_B'
};

var fmSynth = function (_Listener) {
  _inherits(fmSynth, _Listener);

  function fmSynth(ctx) {
    _classCallCheck(this, fmSynth);

    var _this = _possibleConstructorReturn(this, (fmSynth.__proto__ || Object.getPrototypeOf(fmSynth)).call(this));

    _this.volume = 8;
    _this.context = ctx;
    _this.decay = 1;
    _this.prevOsc = null;
    _this.oscillators = {};
    _this.playing = false;
    _this.waveformOptions = ['square', 'sine', 'sawtooth'];
    _this.waveform = 'square';
    _this.fmMode = 'parallel';
    return _this;
  }

  _createClass(fmSynth, [{
    key: 'storeOscillators',
    value: function storeOscillators(data) {
      var _this2 = this;

      Object.keys(data).forEach(function (key) {
        _this2.oscillators[key] = data[key];
      });
    }
  }, {
    key: 'stopAll',
    value: function stopAll() {
      if (!this.oscillators.osc1) return;
      this.oscillators.gainNode1.gain.setTargetAtTime(0, this.context.currentTime + this.decay * 0.01, 0.05);
      this.oscillators.gainNode2.gain.setTargetAtTime(0, this.context.currentTime + this.decay * 0.01, 0.05);
      this.oscillators.osc1.stop(this.context.currentTime + 1);
      this.oscillators.osc2.stop(this.context.currentTime + 1);
      this.oscillators.modulator1.stop(this.context.currentTime + 1);
      this.oscillators.modulator2.stop(this.context.currentTime + 1);
      this.oscillators.modulatorA.stop(this.context.currentTime + 1);
      this.oscillators.modulatorB.stop(this.context.currentTime + 1);
      this.oscillators = {};
      this.playing = false;
    }
  }, {
    key: 'getModulator',
    value: function getModulator(oct, wave, gain) {
      var modulator = this.context.createOscillator();
      var modulatorGain = this.context.createGain();
      modulator.type = wave;
      modulator.frequency.value = oct;
      modulatorGain.gain.value = gain;
      modulator.connect(modulatorGain);
      return [modulator, modulatorGain];
    }
  }, {
    key: 'getOscillator',
    value: function getOscillator(pan) {
      var osc = this.context.createOscillator();
      osc.type = this.waveform;

      var gainNode = this.context.createGain();
      gainNode.gain.value = this.volume * 0.02;

      var panNode = this.context.createStereoPanner();

      var panValue = 0;
      if (pan === 'left') panValue = -0.7;
      if (pan === 'right') panValue = 0.7;
      panNode.pan.value = panValue;

      var filter = this.context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 0;

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(panNode);
      panNode.connect(this.context.destination);
      return [osc, filter, gainNode];
    }
  }, {
    key: 'setupOscillators_A',
    value: function setupOscillators_A() {
      var _getOscillator = this.getOscillator('left'),
          _getOscillator2 = _slicedToArray(_getOscillator, 3),
          osc1 = _getOscillator2[0],
          filter1 = _getOscillator2[1],
          gainNode1 = _getOscillator2[2];

      var _getOscillator3 = this.getOscillator('right'),
          _getOscillator4 = _slicedToArray(_getOscillator3, 3),
          osc2 = _getOscillator4[0],
          filter2 = _getOscillator4[1],
          gainNode2 = _getOscillator4[2];

      var _getModulator = this.getModulator(10, 'sawtooth', 70),
          _getModulator2 = _slicedToArray(_getModulator, 2),
          modulatorA = _getModulator2[0],
          modulatorGainA = _getModulator2[1];

      var _getModulator3 = this.getModulator(10, 'sine', 90),
          _getModulator4 = _slicedToArray(_getModulator3, 2),
          modulatorB = _getModulator4[0],
          modulatorGainB = _getModulator4[1];

      var _getModulator5 = this.getModulator(50, 'sawtooth', 50),
          _getModulator6 = _slicedToArray(_getModulator5, 2),
          modulator1 = _getModulator6[0],
          modulatorGain1 = _getModulator6[1];

      var _getModulator7 = this.getModulator(100, 'square', 30),
          _getModulator8 = _slicedToArray(_getModulator7, 2),
          modulator2 = _getModulator8[0],
          modulatorGain2 = _getModulator8[1];

      modulatorGainA.connect(modulator1.frequency);
      modulatorGainB.connect(modulator2.frequency);
      modulatorGain1.connect(osc1.frequency);
      modulatorGain2.connect(osc2.frequency);
      return [osc1, osc2, gainNode1, gainNode2, modulatorA, modulatorB, modulator1, modulator2, filter1, filter2];
    }
  }, {
    key: 'setupOscillators_B',
    value: function setupOscillators_B() {
      var _getOscillator5 = this.getOscillator(),
          _getOscillator6 = _slicedToArray(_getOscillator5, 3),
          osc1 = _getOscillator6[0],
          filter1 = _getOscillator6[1],
          gainNode1 = _getOscillator6[2];

      var _getOscillator7 = this.getOscillator(),
          _getOscillator8 = _slicedToArray(_getOscillator7, 3),
          osc2 = _getOscillator8[0],
          filter2 = _getOscillator8[1],
          gainNode2 = _getOscillator8[2];

      var _getModulator9 = this.getModulator(50, 'square', 35),
          _getModulator10 = _slicedToArray(_getModulator9, 2),
          modulatorA = _getModulator10[0],
          modulatorGainA = _getModulator10[1];

      var _getModulator11 = this.getModulator(10, 'sine', 50),
          _getModulator12 = _slicedToArray(_getModulator11, 2),
          modulatorB = _getModulator12[0],
          modulatorGainB = _getModulator12[1];

      var _getModulator13 = this.getModulator(5, 'sine', 30),
          _getModulator14 = _slicedToArray(_getModulator13, 2),
          modulator1 = _getModulator14[0],
          modulatorGain1 = _getModulator14[1];

      var _getModulator15 = this.getModulator(50, 'square', 25),
          _getModulator16 = _slicedToArray(_getModulator15, 2),
          modulator2 = _getModulator16[0],
          modulatorGain2 = _getModulator16[1];

      modulatorGainA.connect(modulator1.frequency);
      modulatorGain1.connect(modulatorB.frequency);
      modulatorGainB.connect(osc1.frequency);
      gainNode1.connect(osc2.frequency);
      return [osc1, osc2, gainNode1, gainNode2, modulatorA, modulatorB, modulator1, modulator2, filter1, filter2];
    }
  }, {
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step,
          note = _ref.note,
          hold = _ref.hold;

      if (step && !hold) {
        this.stopAll();
        var methodName = fmModeMethods[this.fmMode];

        var _methodName = this[methodName](note, step),
            _methodName2 = _slicedToArray(_methodName, 10),
            osc1 = _methodName2[0],
            osc2 = _methodName2[1],
            gainNode1 = _methodName2[2],
            gainNode2 = _methodName2[3],
            modulatorA = _methodName2[4],
            modulatorB = _methodName2[5],
            modulator1 = _methodName2[6],
            modulator2 = _methodName2[7],
            filter1 = _methodName2[8],
            filter2 = _methodName2[9];

        this.storeOscillators({
          osc1: osc1, osc2: osc2,
          modulatorA: modulatorA, modulatorB: modulatorB,
          modulator1: modulator1, modulator2: modulator2,
          gainNode1: gainNode1, gainNode2: gainNode2
        });
        modulatorA.start();
        modulatorB.start();
        modulator1.start();
        modulator2.start();
        osc1.start();
        osc2.start();
        filter1.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03);
        filter2.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03);
        this.playing = true;
      }
      if (step && this.playing || hold && step && this.playing) {
        this.oscillators.osc1.detune.value = note * 101;
        this.oscillators.osc1.frequency.value = step * 220;
        this.oscillators.osc2.detune.value = note * 99;
        this.oscillators.osc2.frequency.value = step * 220;
      }
      if (!step && this.oscillators.osc1) {
        this.stopAll();
      }
    }
  }]);

  return fmSynth;
}(_Listener3.default);

exports.default = fmSynth;
var fmControlFunction = exports.fmControlFunction = function fmControlFunction(state, modules, moduleMap, ctx, x, y) {
  var initialVolume = state.instruments.fm.volume;
  var volume = new _InstrumentControlValue2.default(ctx, x, y, 'Volume', initialVolume, 10, function (value) {
    state.instruments.fm.setProp({ property: 'volume', value: value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  var initialDecay = state.instruments.fm.decay;
  var decay = new _InstrumentControlValue2.default(ctx, x, y + 40, 'Decay', initialDecay, 9, function (value) {
    if (value === 0) value += 1;
    state.instruments.fm.setProp({ property: 'decay', value: value });
  });
  modules.push(decay);
  moduleMap['0/1'] = decay;
  moduleMap['1/1'] = decay;
  moduleMap['2/1'] = decay;

  var waveform = new _InstrumentControlOptions2.default(ctx, x + 3 * 40, y, 'Waveform', ['square', 'sine', 'sawtooth'], state.instruments.fm.waveform, function (value) {
    state.instruments.fm.setProp({ property: 'waveform', value: value });
  });
  modules.push(waveform);
  moduleMap['3/0'] = waveform;
  moduleMap['4/0'] = waveform;
  moduleMap['5/0'] = waveform;
  moduleMap['6/0'] = waveform;

  var fmMode = new _InstrumentControlOptions2.default(ctx, x + 3 * 40, y + 40, 'FM Mode', ['vertical', 'parallel'], state.instruments.fm.fmMode, function (value) {
    state.instruments.fm.setProp({ property: 'fmMode', value: value });
  });
  modules.push(fmMode);
  moduleMap['3/1'] = fmMode;
  moduleMap['4/1'] = fmMode;
  moduleMap['5/1'] = fmMode;
  moduleMap['6/1'] = fmMode;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hatControlFunction = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

var _InstrumentControlValue = __webpack_require__(1);

var _InstrumentControlValue2 = _interopRequireDefault(_InstrumentControlValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hat = function (_Listener) {
  _inherits(Hat, _Listener);

  function Hat(ctx) {
    _classCallCheck(this, Hat);

    var _this = _possibleConstructorReturn(this, (Hat.__proto__ || Object.getPrototypeOf(Hat)).call(this));

    _this.volume = 8;
    _this.context = ctx;
    _this.prevOsc = null;
    _this.buffer = noiseBuffer(ctx);
    return _this;
  }

  _createClass(Hat, [{
    key: 'getNoise',
    value: function getNoise() {
      var noise = this.context.createBufferSource();
      noise.buffer = this.buffer;
      var noiseFilter = this.context.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 2500;
      noise.connect(noiseFilter);

      var noiseEnvelope = this.context.createGain();
      noiseEnvelope.gain.value = this.volume * 0.1;
      noiseFilter.connect(noiseEnvelope);
      noiseEnvelope.connect(this.context.destination);
      return [noise, noiseEnvelope];
    }
  }, {
    key: 'stopAll',
    value: function stopAll() {
      if (this.prevOsc) {
        this.prevOsc.stop(0);
      }
    }
  }, {
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step;

      if (step) {
        this.stopAll();
        var time = step === 1 ? 0.01 : 0.05;

        var _getNoise = this.getNoise(),
            _getNoise2 = _slicedToArray(_getNoise, 2),
            noise = _getNoise2[0],
            noiseEnvelope = _getNoise2[1];

        this.prevOsc = noise;
        noise.start(0);
        noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, time);
        noise.stop(this.context.currentTime + 0.30);
      }
    }
  }]);

  return Hat;
}(_Listener3.default);

exports.default = Hat;


function noiseBuffer(context) {
  var bufferSize = context.sampleRate;
  var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  var output = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

var hatControlFunction = exports.hatControlFunction = function hatControlFunction(state, modules, moduleMap, ctx, x, y) {
  var initialVolume = state.instruments.hat.volume;
  var volume = new _InstrumentControlValue2.default(ctx, x, y, 'Volume', initialVolume, 10, function (value) {
    state.instruments.hat.setProp({ property: 'volume', value: value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kickControlFunction = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

var _InstrumentControlValue = __webpack_require__(1);

var _InstrumentControlValue2 = _interopRequireDefault(_InstrumentControlValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KickSynth = function (_Listener) {
  _inherits(KickSynth, _Listener);

  function KickSynth(ctx) {
    _classCallCheck(this, KickSynth);

    var _this = _possibleConstructorReturn(this, (KickSynth.__proto__ || Object.getPrototypeOf(KickSynth)).call(this));

    _this.volume = 8;
    _this.context = ctx;
    _this.decay = 0;
    _this.attack = 9;
    _this.config = {
      type: 'sine'
    };
    return _this;
  }

  _createClass(KickSynth, [{
    key: 'stopAll',
    value: function stopAll() {}
  }, {
    key: 'getOscillators',
    value: function getOscillators(note) {
      var osc = this.context.createOscillator();
      var blipOsc = this.context.createOscillator();
      var gain = this.context.createGain();
      var blipGain = this.context.createGain();
      gain.gain.value = this.volume * 0.1;
      blipGain.gain.value = (this.volume - (9 - this.attack)) * 0.1;
      osc.frequency.value = 55;
      blipOsc.frequency.value = 440;
      osc.detune.value = note * 100;
      blipOsc.detune.value = note * 100;
      osc.connect(gain);
      blipOsc.connect(blipGain);
      gain.connect(this.context.destination);
      blipGain.connect(this.context.destination);
      return [osc, gain, blipOsc, blipGain];
    }
  }, {
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step,
          note = _ref.note;

      var _getOscillators = this.getOscillators(note),
          _getOscillators2 = _slicedToArray(_getOscillators, 4),
          osc = _getOscillators2[0],
          gain = _getOscillators2[1],
          blipOsc = _getOscillators2[2],
          blipGain = _getOscillators2[3];

      if (step) {
        osc.start();
        blipOsc.start();
        blipGain.gain.setTargetAtTime(this.volume * 0.1, this.context.currentTime, 0.01 * this.attack);
        gain.gain.setTargetAtTime(0, this.context.currentTime, 0.07 + this.decay * 0.01);
        blipGain.gain.setTargetAtTime(0, this.context.currentTime, 0.10);
        blipOsc.frequency.setTargetAtTime(55, this.context.currentTime, 0.05);
        osc.stop(this.context.currentTime + 1);
        blipOsc.stop(this.context.currentTime + 1);
      }
    }
  }]);

  return KickSynth;
}(_Listener3.default);

exports.default = KickSynth;
var kickControlFunction = exports.kickControlFunction = function kickControlFunction(state, modules, moduleMap, ctx, x, y) {
  var initialVolume = state.instruments.kick.volume;
  var volume = new _InstrumentControlValue2.default(ctx, x, y, 'Volume', initialVolume, 10, function (value) {
    state.instruments.kick.setProp({ property: 'volume', value: value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  var initialAttack = state.instruments.kick.attack;
  var attack = new _InstrumentControlValue2.default(ctx, x, y + 40, 'Attack', initialAttack, 10, function (value) {
    state.instruments.kick.setProp({ property: 'attack', value: value });
  });
  modules.push(attack);
  moduleMap['0/1'] = attack;
  moduleMap['1/1'] = attack;
  moduleMap['2/1'] = attack;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leadControlFunction = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

var _InstrumentControlValue = __webpack_require__(1);

var _InstrumentControlValue2 = _interopRequireDefault(_InstrumentControlValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeadSynth = function (_Listener) {
  _inherits(LeadSynth, _Listener);

  function LeadSynth(ctx) {
    _classCallCheck(this, LeadSynth);

    var _this = _possibleConstructorReturn(this, (LeadSynth.__proto__ || Object.getPrototypeOf(LeadSynth)).call(this));

    _this.volume = 8;
    _this.context = ctx;
    _this.previousTone = 0;
    _this.previousOct = 1;
    _this.decay = 0;
    _this.prevOsc = null;
    _this.playing = false;
    _this.waveform = 'sine';
    return _this;
  }

  _createClass(LeadSynth, [{
    key: 'stopAll',
    value: function stopAll() {
      if (!this.prevOsc) return;
      this.prevGainNode.gain.setTargetAtTime(0, this.context.currentTime + 0.1 + this.decay * 0.02, 0.05);
      this.prevOsc.stop(this.context.currentTime + 1);
      this.prevOsc = null;
      this.playing = false;
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators(note, oct) {
      this.previousTone = note;
      this.previousOct = oct;

      var osc = this.context.createOscillator();
      osc.detune.value = this.previousTone * 100;
      osc.frequency.value = this.previousOct * 220;
      osc.type = this.waveform;

      var gainNode = this.context.createGain();
      gainNode.gain.value = 0;

      var filter = this.context.createBiquadFilter();
      // filter.type = 'lowpass'
      filter.frequency.value = 2500;

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.context.destination);

      return [osc, gainNode, filter];
    }
  }, {
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step,
          note = _ref.note,
          hold = _ref.hold;

      if (step && !hold) {
        this.stopAll();

        var _getOscillators = this.getOscillators(note, step),
            _getOscillators2 = _slicedToArray(_getOscillators, 3),
            osc = _getOscillators2[0],
            gainNode = _getOscillators2[1],
            filter = _getOscillators2[2];

        this.prevOsc = osc;
        this.prevGainNode = gainNode;
        osc.start();
        gainNode.gain.setTargetAtTime(this.volume * 0.1, this.context.currentTime + 0.01, 0.02);
        filter.frequency.setTargetAtTime(500, this.context.currentTime + 0.1, 0.03);
        this.playing = true;
      }
      if (step && this.playing || hold && step && this.playing) {
        this.prevOsc.detune.setTargetAtTime(note * 100, this.context.currentTime, 0.03);
        this.prevOsc.frequency.setTargetAtTime(step * 440, this.context.currentTime, 0.03);
      }
      if (!step && this.prevOsc) {
        this.stopAll();
      }
    }
  }]);

  return LeadSynth;
}(_Listener3.default);

exports.default = LeadSynth;
var leadControlFunction = exports.leadControlFunction = function leadControlFunction(state, modules, moduleMap, ctx, x, y) {
  var initialVolume = state.instruments.lead.volume;
  var volume = new _InstrumentControlValue2.default(ctx, x, y, 'Volume', initialVolume, 10, function (value) {
    state.instruments.lead.setProp({ property: 'volume', value: value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snareControlFunction = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

var _InstrumentControlValue = __webpack_require__(1);

var _InstrumentControlValue2 = _interopRequireDefault(_InstrumentControlValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Snare = function (_Listener) {
  _inherits(Snare, _Listener);

  function Snare(ctx) {
    _classCallCheck(this, Snare);

    var _this = _possibleConstructorReturn(this, (Snare.__proto__ || Object.getPrototypeOf(Snare)).call(this));

    _this.volume = 8;
    _this.context = ctx;
    _this.config = {
      type: 'triangle'
    };
    _this.buffer = noiseBuffer(ctx);
    return _this;
  }

  _createClass(Snare, [{
    key: 'setVolume',
    value: function setVolume(value) {
      this.volume = value;
    }
  }, {
    key: 'stopAll',
    value: function stopAll() {}
  }, {
    key: 'getNoise',
    value: function getNoise() {
      var noise = this.context.createBufferSource();
      noise.buffer = this.buffer;

      var noiseFilter = this.context.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;

      var noiseEnvelope = this.context.createGain();
      noiseEnvelope.gain.value = this.volume * 0.1;

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseEnvelope);
      noiseEnvelope.connect(this.context.destination);
      return [noise, noiseEnvelope];
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators() {
      var osc = this.context.createOscillator();
      osc.type = this.config.type;
      osc.frequency.value = 150;

      var gain = this.context.createGain();
      gain.gain.value = this.volume * 0.1;
      osc.connect(gain);
      gain.connect(this.context.destination);
      return [osc, gain];
    }
  }, {
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step;

      if (step) {
        var _getOscillators = this.getOscillators(),
            _getOscillators2 = _slicedToArray(_getOscillators, 2),
            osc = _getOscillators2[0],
            gain = _getOscillators2[1];

        var _getNoise = this.getNoise(),
            _getNoise2 = _slicedToArray(_getNoise, 2),
            noise = _getNoise2[0],
            noiseEnvelope = _getNoise2[1];

        osc.start();
        noise.start();
        gain.gain.setTargetAtTime(0, this.context.currentTime, 0.04);
        noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, 0.03);
        osc.stop(this.context.currentTime + 0.30);
        noise.stop(this.context.currentTime + 0.30);
      }
    }
  }]);

  return Snare;
}(_Listener3.default);

exports.default = Snare;


function noiseBuffer(context) {
  var bufferSize = context.sampleRate;
  var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  var output = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

var snareControlFunction = exports.snareControlFunction = function snareControlFunction(state, modules, moduleMap, ctx, x, y) {
  var initialVolume = state.instruments.snare.volume;
  var volume = new _InstrumentControlValue2.default(ctx, x, y, 'Volume', initialVolume, 10, function (value) {
    state.instruments.snare.setProp({ property: 'volume', value: value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kick = __webpack_require__(7);

var _kick2 = _interopRequireDefault(_kick);

var _leadSynth = __webpack_require__(8);

var _leadSynth2 = _interopRequireDefault(_leadSynth);

var _synth = __webpack_require__(2);

var _synth2 = _interopRequireDefault(_synth);

var _fm = __webpack_require__(5);

var _fm2 = _interopRequireDefault(_fm);

var _snare = __webpack_require__(9);

var _snare2 = _interopRequireDefault(_snare);

var _hat = __webpack_require__(6);

var _hat2 = _interopRequireDefault(_hat);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeStepArray(steps) {
  var empty = [];
  empty.length = steps;
  empty.fill(undefined);
  var arr = empty.map(function (item) {
    return { step: 0, note: 0, hold: false };
  });
  return arr;
}

var State = function () {
  function State(audioCtx) {
    _classCallCheck(this, State);

    this.swingIsOn = false;
    this.isPlaying = false;
    this.tempo = 120;
    this.page = 0;
    this.blocks = {};
    this.blinkers = [];
    this.children = [];
    this.steps = {
      bass: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      kick: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      snare: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      lead: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      fm: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      hat: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)]
    };
    this.copyBuffer = { notes: {}, steps: {} };
    this.step = 0;
    this.context = audioCtx;
    this.instruments = {
      bass: new _synth2.default(audioCtx),
      kick: new _kick2.default(audioCtx),
      snare: new _snare2.default(audioCtx),
      fm: new _fm2.default(audioCtx),
      lead: new _leadSynth2.default(audioCtx),
      hat: new _hat2.default(audioCtx)
    };
  }

  _createClass(State, [{
    key: 'push',
    value: function push(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: 'trigger',
    value: function trigger(message) {
      switch (message.type) {
        case 'get_page':
          return this.steps[message.instrument][this.page];
        case 'toggle_swing':
          return this.swingIsOn = !this.swingIsOn;
        case 'set_page':
          this.page = message.page;
          this.drawScreen();
          return message.page;
        case 'copy_page':
          return this.copyPage();
        case 'paste_page':
          return this.pastePage();
      }
    }
  }, {
    key: 'toggleStep',
    value: function toggleStep(idx, type, values) {
      this.steps[type][this.page][idx].step = (this.steps[type][this.page][idx].step + 1) % values;
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.noteTime = 0.0;
        this.startTime = this.context.currentTime + 0.005;
        this.rhythmIndex = 0;
        this.previousRhythmIndex = null;
        this.schedule();
      } else {
        this.stop();
      }
    }
  }, {
    key: 'copyPage',
    value: function copyPage() {
      var _this = this;

      Object.keys(this.steps).forEach(function (stepKey) {
        _this.copyBuffer.steps[stepKey] = _this.steps[stepKey][_this.page].slice().map(function (step) {
          return Object.assign({}, step);
        });
      });
    }
  }, {
    key: 'pastePage',
    value: function pastePage() {
      var _this2 = this;

      Object.keys(this.steps).forEach(function (stepKey) {
        _this2.steps[stepKey][_this2.page] = _this2.copyBuffer.steps[stepKey].slice();
      });
      this.refreshScreen();
    }
  }, {
    key: 'schedule',
    value: function schedule() {
      var _this3 = this;

      var currentTime = this.context.currentTime;
      currentTime -= this.startTime;

      while (this.noteTime < currentTime + 0.200) {
        var contextPlayTime = this.noteTime + this.startTime;
        this.blinkers[this.rhythmIndex].toggle();
        if (this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle(false);
        /* for each instrument pass the step object for this page and beat into the play method */
        Object.keys(this.steps).forEach(function (type) {
          _this3.instruments[type].play(_this3.steps[type][_this3.page][_this3.rhythmIndex]);
        });
        this.advanceNote();
      }
      this.interval = setTimeout(function () {
        _this3.schedule();
      }, 0);
    }
  }, {
    key: 'advanceNote',
    value: function advanceNote() {
      var secondsPerBeat = 60 / this.tempo;
      this.previousRhythmIndex = this.rhythmIndex;
      this.rhythmIndex++;
      if (this.rhythmIndex === _constants.LOOP_LENGTH) {
        this.rhythmIndex = 0;
      }

      if (this.swingIsOn) {
        this.noteTime += this.rhythmIndex % 2 ? 0.32 * secondsPerBeat : 0.18 * secondsPerBeat;
      } else {
        this.noteTime += 0.25 * secondsPerBeat;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this4 = this;

      Object.keys(this.instruments).forEach(function (key) {
        _this4.instruments[key].stopAll();
      });
      this.blinkers[this.previousRhythmIndex].toggle();
      window.clearInterval(this.interval);
    }
  }, {
    key: 'drawScreen',
    value: function drawScreen() {
      this.children.forEach(function (child) {
        return child.render();
      });
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BeatMarker = function () {
  function BeatMarker(ctx, x, y) {
    _classCallCheck(this, BeatMarker);

    this.context = ctx;
    this.x = x;
    this.y = y;
  }

  _createClass(BeatMarker, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'red';
      this.context.fillRect(this.x, this.y, 40, 40);
      this.context.clearRect(this.x, this.y, 30, 30);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {}
  }]);

  return BeatMarker;
}();

exports.default = BeatMarker;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(text, ctx, x, y, handleClick) {
    _classCallCheck(this, Button);

    this.x = x;
    this.y = y;
    this.text = text;
    this.textWidth = Math.ceil(ctx.measureText(text).width);
    this.width = Math.ceil((this.textWidth + 10) / 40) * 40;
    this.toggled = false;
    this.context = ctx;
    this.callBack = handleClick;
  }

  _createClass(Button, [{
    key: 'handleClick',
    value: function handleClick(x, y) {
      this.toggled = !this.toggled;
      this.callBack(this.toggled);
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.context.clearRect(this.x, this.y, this.width, 40);
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, this.width, 40);
      if (this.isToggled ? this.isToggled() : this.toggled) {
        this.context.fillStyle = '#999';
        this.context.fillRect(this.x + 1, this.y, this.width - 2, 39);
      } else {
        this.context.clearRect(this.x + 1, this.y + 1, this.width - 2, 39);
      }
      this.context.fillStyle = 'black';
      var wordMargin = this.width / 2 - this.textWidth / 2;
      this.context.fillText(this.text, this.x + wordMargin, this.y + 25, this.width + 3);
    }
  }]);

  return Button;
}();

exports.default = Button;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _synth = __webpack_require__(2);

var _synth2 = _interopRequireDefault(_synth);

var _switch = __webpack_require__(24);

var _Blinker = __webpack_require__(20);

var _Blinker2 = _interopRequireDefault(_Blinker);

var _note = __webpack_require__(23);

var _note2 = _interopRequireDefault(_note);

var _instrumentControlFunctions = __webpack_require__(18);

var _instrumentControlFunctions2 = _interopRequireDefault(_instrumentControlFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InstrumentWindow = function () {
  function InstrumentWindow(state, ctx, x, y) {
    _classCallCheck(this, InstrumentWindow);

    this.x = x;
    this.y = y;
    this.parent = state;
    this.context = ctx;
    this.instrument = 'bass';
    this.instrumentControlMap = {};
    this.moduleMap = {};
    this.children = [];
    this.instrumentControls = [];
    this.build();
  }

  _createClass(InstrumentWindow, [{
    key: 'push',
    value: function push(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: 'build',
    value: function build() {
      for (var i = 0; i < 16; i++) {
        this.moduleMap[i + '/9'] = this.push(new _note2.default(i, this, this.context, this.x + i * 40, this.y + 9 * 40));
        this.moduleMap[i + '/10'] = this.push(new _switch.OctaveSwitch(i, this, this.context, this.x + i * 40, this.y + 10 * 40));
        this.moduleMap[i + '/11'] = this.push(new _Blinker2.default(i, this.parent, this.context, this.x + i * 40, this.y + 11 * 40));
      }
      this.buildInstrumentControls();
    }
  }, {
    key: 'buildInstrumentControls',
    value: function buildInstrumentControls() {
      _instrumentControlFunctions2.default[this.instrument](this.parent, this.instrumentControls, this.instrumentControlMap, this.context, this.x + 10, this.y + 10);
    }
  }, {
    key: 'trigger',
    value: function trigger(message) {
      return this.parent.trigger(message);
    }
  }, {
    key: 'setInstrument',
    value: function setInstrument(instrument) {
      this.instrument = instrument;
      this.instrumentControls = [];
      this.instrumentControlMap = {};
      this.build();
      this.parent.drawScreen();
    }
  }, {
    key: 'getPage',
    value: function getPage() {
      return this.trigger({ type: 'get_page', instrument: this.instrument });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      this.children.forEach(function (child) {
        return child.render();
      });
      this.instrumentControls.forEach(function (child) {
        return child.render();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      this.context.fillRect(this.x, this.y, 640, 480);
      this.context.clearRect(this.x + 1, this.y + 1, 638, 478);
      this.renderChildren();
    }
  }, {
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      var xCell = x - this.x / 40;
      var yCell = y - this.y / 40;
      var key = xCell + '/' + yCell;
      var module = this.moduleMap[key] || this.instrumentControlMap[key];
      if (module) module.handleClick(x, y, innerX, innerY);
    }
  }]);

  return InstrumentWindow;
}();

/*
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
0   . . . . . . . . . . .  .  .  .  .  .  .
1   . . . . . . . . . . .  .  .  .  .  .  .
2   . . . . . . . . . . .  .  .  .  .  .  .
3   . . . . . . . . . . .  .  .  .  .  .  .
4   . . . . . . . . . . .  .  .  .  .  .  .
5   . . . . . . . . . . .  .  .  .  .  .  .
6   . . . . . . . . . . .  .  .  .  .  .  .
7   . . . . . . . . . . .  .  .  .  .  .  .
8   . . . . . . . . . . .  .  .  .  .  .  .
9   . . . . . . . . . . .  .  .  .  .  .  .
10  . . . . . . . . . . .  .  .  .  .  .  .
11  . . . . . . . . . . .  .  .  .  .  .  .
*/


exports.default = InstrumentWindow;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageButton = function () {
  function PageButton(state, ctx, x, y, handleClick) {
    _classCallCheck(this, PageButton);

    this.context = ctx;
    this.state = state;
    this.pageOne = x / 40;
    this.x = x;
    this.y = y;
    this.value = 0;
    this.callBack = handleClick;
  }

  _createClass(PageButton, [{
    key: 'handleClick',
    value: function handleClick(x, y) {
      var buttonIdx = x - this.pageOne;
      this.value = buttonIdx;
      this.state.trigger({ type: 'set_page', page: this.value });
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.value = this.state.page; // reset page btn to top level page value
      this.context.clearRect(this.x, this.y, 40, 160);
      this.context.fillStyle = 'black';
      for (var i = 0; i < 4; i++) {
        var offset = 40 * i;
        var name = 'Pg ' + (i + 1);
        this.context.fillRect(this.x + offset, this.y, 40, 40);
        if (i === this.value) {
          this.context.fillStyle = '#999';
          this.context.fillRect(this.x + offset + 1, this.y, 39 - (i === 3 ? 1 : 0), 39);
        } else {
          this.context.clearRect(this.x + offset + 1, this.y, 39 - (i === 3 ? 1 : 0), 39);
        }
        this.context.fillStyle = 'black';
        this.context.fillText(name, this.x + offset + 3, this.y + 25, 80);
      }
    }
  }]);

  return PageButton;
}();

exports.default = PageButton;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayBtn = function () {
  function PlayBtn(ctx, state, x, y) {
    _classCallCheck(this, PlayBtn);

    this.context = ctx;
    this.state = state;
    this.x = x;
    this.y = y;
    this.on = state.isPlaying;
  }

  _createClass(PlayBtn, [{
    key: 'render',
    value: function render() {
      this.on = this.state.isPlaying;
      this.context.fillStyle = this.on ? 'red' : 'green';
      this.context.fillRect(this.x, this.y, 40, 40);
      this.context.fillStyle = this.on ? 'black' : 'white';
      this.context.fillText(this.on ? 'STOP' : 'PLAY', this.x + 1, this.y + 25, 80);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.state.togglePlay();
      this.on = this.state.isPlaying;
      this.render();
    }
  }]);

  return PlayBtn;
}();

exports.default = PlayBtn;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayBtn = function () {
  function PlayBtn(state, ctx, x, y) {
    _classCallCheck(this, PlayBtn);

    this.context = ctx;
    this.state = state;
    this.x = x;
    this.y = y;
  }

  _createClass(PlayBtn, [{
    key: 'render',
    value: function render() {
      var tempoText = this.state.tempo + '/bpms';
      this.context.fillStyle = 'black';
      this.context.clearRect(this.x, this.y, 65, 40);
      this.context.fillText('+', this.x + 25, this.y + 10, 80);
      this.context.fillText('-', this.x + 26, this.y + 40, 80);
      this.context.fillText(tempoText, this.x, this.y + 25, 80);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      var section = Math.floor(innerY / 20);
      this.state.tempo = section ? this.state.tempo - 1 : this.state.tempo + 1;
      this.render();
    }
  }]);

  return PlayBtn;
}();

exports.default = PlayBtn;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Word = function () {
  function Word(word, ctx, x, y, handleClick) {
    _classCallCheck(this, Word);

    this.context = ctx;
    this.word = word;
    this.x = x;
    this.y = y;
    this.handleClick = handleClick || function () {};
  }

  _createClass(Word, [{
    key: 'render',
    value: function render() {
      this.context.clearRect(this.x, this.y, 40, 40);
      this.context.fillStyle = 'green';
      this.context.fillText(this.word, this.x + 3, this.y + 25, 80);
    }
  }]);

  return Word;
}();

exports.default = Word;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _synth = __webpack_require__(2);

var _leadSynth = __webpack_require__(8);

var _fm = __webpack_require__(5);

var _kick = __webpack_require__(7);

var _hat = __webpack_require__(6);

var _snare = __webpack_require__(9);

var map = {
  'bass': _synth.bassControlFunction,
  'lead': _leadSynth.leadControlFunction,
  'fm': _fm.fmControlFunction,
  'kick': _kick.kickControlFunction,
  'hat': _hat.hatControlFunction,
  'snare': _snare.snareControlFunction
};

exports.default = map;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _state = __webpack_require__(10);

var _state2 = _interopRequireDefault(_state);

var _PlayBtn = __webpack_require__(15);

var _PlayBtn2 = _interopRequireDefault(_PlayBtn);

var _BeatMarker = __webpack_require__(11);

var _BeatMarker2 = _interopRequireDefault(_BeatMarker);

var _Word = __webpack_require__(17);

var _Word2 = _interopRequireDefault(_Word);

var _Options = __webpack_require__(3);

var _Options2 = _interopRequireDefault(_Options);

var _PageButton = __webpack_require__(14);

var _PageButton2 = _interopRequireDefault(_PageButton);

var _Tempo = __webpack_require__(16);

var _Tempo2 = _interopRequireDefault(_Tempo);

var _Button = __webpack_require__(12);

var _Button2 = _interopRequireDefault(_Button);

var _InstrumentWindow = __webpack_require__(13);

var _InstrumentWindow2 = _interopRequireDefault(_InstrumentWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('synth');
var ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif';
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var state = new _state2.default(audioCtx);

/* Play button */
var playBtn = state.push(new _PlayBtn2.default(ctx, state, 0, 0));
state.blocks['0/0'] = playBtn;

/* Page controls */
var pageButton = state.push(new _PageButton2.default(state, ctx, 2 * 40, 0));
state.blocks['2/0'] = pageButton;
state.blocks['3/0'] = pageButton;
state.blocks['4/0'] = pageButton;
state.blocks['5/0'] = pageButton;

state.blocks['7/0'] = state.push(new _Word2.default('Copy', ctx, 7 * 40, 0, function () {
  return state.trigger({ type: 'copy_page' });
}));
state.blocks['8/0'] = state.push(new _Word2.default('Paste', ctx, 8 * 40, 0, function () {
  return state.trigger({ type: 'paste_page' });
}));
/* Tempo */
var tempo = state.push(new _Tempo2.default(state, ctx, 11 * 40, 0));
state.blocks['11/0'] = tempo;
state.blocks['12/0'] = tempo;

var toggleSwing = function toggleSwing() {
  return state.trigger({ type: 'toggle_swing' });
};
var swingToggle = state.push(new _Options2.default({ options: ['straight', 'swing'], cb: toggleSwing, ctx: ctx, x: 14 * 40, y: 0 }));
state.blocks['14/0'] = swingToggle;
state.blocks['15/0'] = swingToggle;

var instrumentWindow = state.push(new _InstrumentWindow2.default(state, ctx, 4 * 40, 3 * 40));
for (var i = 4; i < 20; i++) {
  for (var k = 3; k < 16; k++) {
    state.blocks[i + '/' + k] = instrumentWindow;
  }
}

var instruments = ['fm', 'bass', 'lead', 'kick', 'snare', 'hat'];
var startX = 4 * 40;

var _loop = function _loop(_i) {
  var btn = new _Button2.default(instruments[_i], ctx, startX, 80, function (on) {
    instrumentWindow.setInstrument(instruments[_i]);
  });
  btn.isToggled = function () {
    return instrumentWindow.instrument === instruments[_i];
  };
  state.push(btn);
  for (var _k = 0; _k <= Math.floor(btn.width / 40); _k++) {
    state.blocks[Math.ceil(startX / 40) + _k + '/2'] = btn;
  }
  startX = startX + btn.width;
};

for (var _i = 0; _i < instruments.length; _i++) {
  _loop(_i);
}

canvas.onclick = function (e) {
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;
  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
  } while (currentElement = currentElement.offsetParent);
  canvasX = e.pageX - totalOffsetX - window.scrollX;
  canvasY = e.pageY - totalOffsetY - window.scrollY;

  var x = Math.floor(canvasX / 40);
  var y = Math.floor(canvasY / 40);
  var innerX = canvasX - x * 40;
  var innerY = canvasY - y * 40;
  var key = x + '/' + y;
  var module = state.blocks[key];
  if (module) {
    state.blocks[key].handleClick(x, y, innerX, innerY);
  }
};

var pageKeys = ['Digit1', 'Digit2', 'Digit3', 'Digit4'];

window.onkeydown = function (e) {
  if (e.code) {
    if (e.code === 'Space') {
      state.togglePlay();
      playBtn.render();
    } else if (pageKeys.indexOf(e.code) !== -1) {
      var page = parseInt(e.code.split('Digit')[1]) - 1;
      state.trigger({ type: 'set_page', page: page });
    } else if (e.code === 'BracketLeft' || e.code === 'BracketRight') {
      var instrumentIdx = instruments.indexOf(instrumentWindow.instrument);
      var nextInstrumentIdx = e.code === 'BracketLeft' ? instrumentIdx - 1 : instrumentIdx + 1;
      nextInstrumentIdx = nextInstrumentIdx % instruments.length;
      instrumentWindow.setInstrument(instruments[nextInstrumentIdx]);
    }
  }
};

state.drawScreen();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blinker = function () {
  function Blinker(i, state, ctx, x, y) {
    _classCallCheck(this, Blinker);

    this.context = ctx;
    state.blinkers[i] = this;
    this.idx = i;
    this.on = false;
    this.x = x;
    this.y = y;
  }

  _createClass(Blinker, [{
    key: 'render',
    value: function render() {
      if (this.on || this.idx % 4 === 0) {
        this.drawCircle();
      } else {
        this.context.clearRect(this.x - 1, this.y - 1, 39, 39);
      }
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle() {
      this.context.beginPath();
      this.context.arc(this.x + 20, this.y + 20, 8, 0, 2 * Math.PI, false);
      this.context.fillStyle = this.idx % 4 ? 'red' : 'blue';
      this.context.fill();
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#003300';
      this.context.stroke();
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {}
  }, {
    key: 'toggle',
    value: function toggle(value) {
      this.on = value !== undefined ? value : !this.on;
      this.render();
    }
  }]);

  return Blinker;
}();

exports.default = Blinker;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Options = __webpack_require__(3);

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControlOptions = function () {
  function ControlOptions(ctx, x, y, text, options, currentValue, cb) {
    _classCallCheck(this, ControlOptions);

    this.context = ctx;
    this.x = x;
    this.y = y;
    this.text = text;
    this.valueInput = new _Options2.default({
      options: options, currentValue: currentValue, cb: cb, ctx: ctx, x: x + 80, y: y
    });
  }

  _createClass(ControlOptions, [{
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      this.valueInput.handleClick(x, y, innerX, innerY);
    }
  }, {
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 120, 40);
      this.context.clearRect(this.x + 1, this.y + 1, 118, 38);
      this.context.fillText(this.text, this.x + 5, this.y + 25, 80);
      this.valueInput.render();
    }
  }]);

  return ControlOptions;
}();

exports.default = ControlOptions;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValueInput = function () {
  function ValueInput(_ref) {
    var ctx = _ref.ctx,
        x = _ref.x,
        y = _ref.y,
        initialValue = _ref.initialValue,
        maxValue = _ref.maxValue,
        cb = _ref.cb;

    _classCallCheck(this, ValueInput);

    this.context = ctx;
    this.value = initialValue;
    this.maxValue = maxValue;
    this.x = x;
    this.y = y;
    this.callback = cb;
  }

  _createClass(ValueInput, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 40, 40);
      this.context.clearRect(this.x + 1, this.y + 1, 38, 38);
      this.context.fillText('+', this.x + 20, this.y + 13, 40);
      this.context.fillText('-', this.x + 21, this.y + 37, 40);
      this.context.fillText(this.value, this.x + 5, this.y + 25, 40);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      var section = Math.floor(innerY / 20);
      this.value = Math.abs((section ? this.value - 1 : this.value + 1) % this.maxValue);
      this.callback(this.value);
      this.render();
    }
  }]);

  return ValueInput;
}();

exports.default = ValueInput;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
  function Note(idx, parent, context, x, y) {
    _classCallCheck(this, Note);

    this.notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'], this.parent = parent;
    this.context = context;
    this.idx = idx;
    this.x = x;
    this.y = y;
  }

  _createClass(Note, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 40, 40);
      this.context.clearRect(this.x + 1, this.y + 1, 38, 38);
      var page = this.parent.getPage();
      var noteIndex = page[this.idx].note;
      this.context.fillText(this.notes[noteIndex], this.x + 15, this.y + 25, 15);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var page = this.parent.getPage();
      page[this.idx].note = page[this.idx].note === 11 ? 0 : page[this.idx].note + 1;
      this.render();
    }
  }]);

  return Note;
}();

exports.default = Note;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OctaveSwitch = exports.BinSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinSwitch = exports.BinSwitch = function () {
  function BinSwitch(idx, state, ctx) {
    _classCallCheck(this, BinSwitch);

    this.idx = idx;
    this.state = state;
    this.context = ctx;
    this.x = null;
    this.y = null;
    this.colors = ['black', 'red'];
  }

  _createClass(BinSwitch, [{
    key: 'render',
    value: function render() {
      var page = this.state.getPage();
      this.context.fillStyle = this.colors[page[this.idx].step];
      this.context.fillRect(this.x, this.y, 39, 39);
      this.context.fillStyle = _constants.COLOR;
    }
  }, {
    key: 'setPos',
    value: function setPos(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var page = this.state.getPage();
      this.value = (this.value + 1) % 2;
      page[this.idx].step = this.value;
      this.context.clearRect(this.x, this.y, 39, 39);
      this.context.fillStyle = this.colors[page[this.idx].step];
      this.context.fillRect(this.x, this.y, 39, 39);
      this.context.fillStyle = _constants.COLOR;
    }
  }]);

  return BinSwitch;
}();

var OctaveSwitch = exports.OctaveSwitch = function () {
  function OctaveSwitch(idx, state, ctx, x, y) {
    _classCallCheck(this, OctaveSwitch);

    this.idx = idx;
    this.state = state;
    this.context = ctx;
    this.x = x;
    this.y = y;
    this.colors = ['black', 'red', 'blue'];
  }

  _createClass(OctaveSwitch, [{
    key: 'render',
    value: function render() {
      var page = this.state.getPage();
      this.context.fillStyle = this.colors[page[this.idx].step];
      this.context.fillRect(this.x, this.y, 39, 39);
      this.context.fillStyle = page[this.idx].hold ? 'green' : 'yellow';
      this.context.fillRect(this.x, this.y, 10, 10);
      this.context.fillStyle = _constants.COLOR;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      var isHold = innerX <= 10 && innerY <= 10;
      var page = this.state.getPage();
      if (isHold) {
        page[this.idx].hold = !page[this.idx].hold;
      } else {
        this.value = (page[this.idx].step + 1) % 3;
        page[this.idx].step = this.value;
      }
      this.context.clearRect(this.x, this.y, 39, 39);
      this.render();
    }
  }]);

  return OctaveSwitch;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map