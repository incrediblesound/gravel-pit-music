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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COLOR = exports.COLOR = 'white';
var LOOP_LENGTH = exports.LOOP_LENGTH = 16;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = exports.PageButton = exports.Word = exports.Blinker = exports.BeatMarker = exports.PlayBtn = exports.Background = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = exports.Background = function () {
  function Background(ctx, x, y) {
    _classCallCheck(this, Background);

    this.context = ctx;
    this.x = x;
    this.y = y;
  }

  _createClass(Background, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 40, 40);
      this.context.clearRect(this.x, this.y, 39, 39);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {}
  }]);

  return Background;
}();

var PlayBtn = exports.PlayBtn = function () {
  function PlayBtn(ctx, state, x, y) {
    _classCallCheck(this, PlayBtn);

    this.context = ctx;
    this.state = state;
    this.x = x;
    this.y = y;
    this.on = false;
  }

  _createClass(PlayBtn, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = this.on ? 'green' : 'yellow';
      this.context.fillRect(this.x, this.y, 40, 40);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.on = !this.on;
      this.state.togglePlay(this.on);
      this.render();
    }
  }]);

  return PlayBtn;
}();

var BeatMarker = exports.BeatMarker = function () {
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

var Blinker = exports.Blinker = function () {
  function Blinker(i, state, ctx) {
    _classCallCheck(this, Blinker);

    this.context = ctx;
    state.blinkers[i] = this;
  }

  _createClass(Blinker, [{
    key: 'render',
    value: function render() {
      if (this.on) {
        this.context.beginPath();
        this.context.arc(this.x + 20, this.y + 20, 8, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'red';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
      } else {
        this.context.clearRect(this.x, this.y, 40, 40);
      }
    }
  }, {
    key: 'setPos',
    value: function setPos(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {}
  }, {
    key: 'toggle',
    value: function toggle() {
      this.on = !this.on;
      this.render();
    }
  }]);

  return Blinker;
}();

var Word = exports.Word = function () {
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
      this.context.fillStyle = 'black';
      this.context.fillText(this.word, this.x + 3, this.y + 25, 80);
    }
  }]);

  return Word;
}();

var PageButton = exports.PageButton = function () {
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
      this.state.setPage(this.value);
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.context.clearRect(this.x, this.y, 40, 160);
      this.context.fillStyle = 'black';
      for (var i = 0; i < 4; i++) {
        var offset = 40 * i;
        var name = 'Pg ' + (i + 1);
        this.context.fillRect(this.x + offset, this.y, 40, 40);
        if (i === this.value) {
          this.context.fillStyle = '#999';
          this.context.fillRect(this.x + offset, this.y, 39, 39);
        } else {
          this.context.clearRect(this.x + offset, this.y, 39, 39);
        }
        this.context.fillStyle = 'black';
        this.context.fillText(name, this.x + offset + 3, this.y + 25, 80);
      }
    }
  }]);

  return PageButton;
}();

var Options = exports.Options = function () {
  function Options(options, callBack, ctx, x, y) {
    _classCallCheck(this, Options);

    this.context = ctx;
    this.idx = 0;
    this.options = options;
    this.callBack = callBack;
    this.x = x;
    this.y = y;
  }

  _createClass(Options, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.clearRect(this.x, this.y, 40, 40);
      this.context.fillText(this.options[this.idx], this.x + 3, this.y + 25, 39);
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
  function Note(idx, type, state, context) {
    _classCallCheck(this, Note);

    this.type = type;
    this.notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'], this.state = state;
    this.context = context;
    this.idx = idx;
  }

  _createClass(Note, [{
    key: 'setPos',
    value: function setPos(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.x, this.y, 40, 40);
      this.context.clearRect(this.x, this.y, 39, 39);
      var noteIndex = this.state.notes[this.type][this.state.page][this.idx];
      this.context.fillText(this.notes[noteIndex], this.x + 15, this.y + 25, 15);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var page = this.state.notes[this.type][this.state.page];
      page[this.idx] = page[this.idx] === 11 ? 0 : page[this.idx] + 1;
      this.render();
    }
  }]);

  return Note;
}();

exports.default = Note;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _synth = __webpack_require__(10);

var _synth2 = _interopRequireDefault(_synth);

var _kick = __webpack_require__(7);

var _kick2 = _interopRequireDefault(_kick);

var _leadSynth = __webpack_require__(8);

var _leadSynth2 = _interopRequireDefault(_leadSynth);

var _fm = __webpack_require__(5);

var _fm2 = _interopRequireDefault(_fm);

var _snare = __webpack_require__(9);

var _snare2 = _interopRequireDefault(_snare);

var _hat = __webpack_require__(6);

var _hat2 = _interopRequireDefault(_hat);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeStepArray(steps) {
  var arr = [];
  arr.length = steps;
  arr.fill(0);
  return arr;
}

var State = function () {
  function State(audioCtx) {
    _classCallCheck(this, State);

    this.blocks = {};
    this.moduleMap = {};
    this.page = 0;
    this.steps = {
      key: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      kick: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      snare: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      leadSynth: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      fmSynth: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      hat: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)]
    };
    this.notes = {
      fmSynth: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      key: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      kick: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      leadSynth: [makeStepArray(16), makeStepArray(16), makeStepArray(16), makeStepArray(16)]
    };
    this.copyBuffer = { notes: {}, steps: {} };
    this.blinkers = [];
    this.step = 0;
    this.context = audioCtx;
    this.instruments = {
      key: new _synth2.default(audioCtx),
      kick: new _kick2.default(audioCtx),
      snare: new _snare2.default(audioCtx),
      fmSynth: new _fm2.default(audioCtx),
      leadSynth: new _leadSynth2.default(audioCtx),
      hat: new _hat2.default(audioCtx)
    };
  }

  _createClass(State, [{
    key: 'setPage',
    value: function setPage(value) {
      this.page = value;
      this.refreshScreen();
      return value;
    }
  }, {
    key: 'toggleStep',
    value: function toggleStep(idx, type, values) {
      this.steps[type][this.page][idx] = (this.steps[type][this.page][idx] + 1) % values;
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay(play) {
      if (play) {
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
        _this.copyBuffer.steps[stepKey] = _this.steps[stepKey][_this.page].slice();
      });
      Object.keys(this.notes).forEach(function (noteKey) {
        _this.copyBuffer.notes[noteKey] = _this.notes[noteKey][_this.page].slice();
      });
    }
  }, {
    key: 'pastePage',
    value: function pastePage() {
      var _this2 = this;

      Object.keys(this.steps).forEach(function (stepKey) {
        _this2.steps[stepKey][_this2.page] = _this2.copyBuffer.steps[stepKey].slice();
      });
      Object.keys(this.notes).forEach(function (noteKey) {
        _this2.notes[noteKey][_this2.page] = _this2.copyBuffer.notes[noteKey].slice();
      });
      this.refreshScreen();
    }
  }, {
    key: 'schedule',
    value: function schedule() {
      var _this3 = this;

      var currentTime = this.context.currentTime;
      // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
      currentTime -= this.startTime;

      while (this.noteTime < currentTime + 0.200) {
        var contextPlayTime = this.noteTime + this.startTime;
        this.blinkers[this.rhythmIndex].toggle();
        if (this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle();
        Object.keys(this.steps).forEach(function (type) {
          if (_this3.steps[type][_this3.page][_this3.rhythmIndex]) {
            var note = _this3.notes[type] && _this3.notes[type][_this3.page][_this3.rhythmIndex];
            _this3.instruments[type].play(note, _this3.steps[type][_this3.page][_this3.rhythmIndex]);
          }
        }
        //Insert draw stuff here
        );this.advanceNote();
      }
      this.interval = setTimeout(function () {
        _this3.schedule();
      }, 0);
    }
  }, {
    key: 'advanceNote',
    value: function advanceNote() {
      // Setting tempo to 60 BPM just for now
      var tempo = 90;
      var secondsPerBeat = 60 / tempo;
      this.previousRhythmIndex = this.rhythmIndex;
      this.rhythmIndex++;
      if (this.rhythmIndex === _constants.LOOP_LENGTH) {
        this.rhythmIndex = 0;
      }

      //0.25 because each square is a 16th note
      this.noteTime += 0.25 * secondsPerBeat;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.blinkers[this.previousRhythmIndex].toggle();
      window.clearInterval(this.interval);
    }
  }, {
    key: 'initScreen',
    value: function initScreen() {
      for (var i = 0; i < 1020; i += 40) {
        for (var k = 0; k < 680; k += 40) {
          var key = i / 40 + '/' + k / 40;
          var module = this.moduleMap[key];
          if (module) {
            module.setPos(i, k);
            this.blocks[key] = module;
          }
          if (this.blocks[key]) this.blocks[key].render();
        }
      }
    }
  }, {
    key: 'refreshScreen',
    value: function refreshScreen() {
      for (var i = 0; i < 1020; i += 40) {
        for (var k = 0; k < 680; k += 40) {
          var key = i / 40 + '/' + k / 40;
          if (this.blocks[key]) this.blocks[key].render();
        }
      }
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OctaveSwitch = exports.BinSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinSwitch = exports.BinSwitch = function () {
  function BinSwitch(idx, type, state, ctx) {
    _classCallCheck(this, BinSwitch);

    this.idx = idx;
    this.type = type;
    this.state = state;
    this.context = ctx;
    this.x = null;
    this.y = null;
    this.colors = ['black', 'red'];
  }

  _createClass(BinSwitch, [{
    key: 'render',
    value: function render() {
      var page = this.state.steps[this.type][this.state.page];
      this.context.fillStyle = this.colors[page[this.idx]];
      this.context.fillRect(this.x, this.y, 37, 37);
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
      var page = this.state.steps[this.type][this.state.page];
      this.value = (this.value + 1) % 2;
      this.state.toggleStep(this.idx, this.type, 2);
      this.context.clearRect(this.x, this.y, 37, 37);
      this.context.fillStyle = this.colors[page[this.idx]];
      this.context.fillRect(this.x, this.y, 37, 37);
      this.context.fillStyle = _constants.COLOR;
    }
  }]);

  return BinSwitch;
}();

var OctaveSwitch = exports.OctaveSwitch = function () {
  function OctaveSwitch(idx, type, state, ctx) {
    _classCallCheck(this, OctaveSwitch);

    this.idx = idx;
    this.type = type;
    this.state = state;
    this.context = ctx;
    this.x = null;
    this.y = null;
    this.colors = ['black', 'red', 'blue'];
  }

  _createClass(OctaveSwitch, [{
    key: 'render',
    value: function render() {
      var page = this.state.steps[this.type][this.state.page];
      this.context.fillStyle = this.colors[page[this.idx]];
      this.context.fillRect(this.x, this.y, 37, 37);
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
      var page = this.state.steps[this.type][this.state.page];
      this.value = (page[this.idx] + 1) % 3;
      this.state.toggleStep(this.idx, this.type, 3);
      this.context.clearRect(this.x, this.y, 37, 37);
      this.context.fillStyle = this.colors[page[this.idx]];
      this.context.fillRect(this.x, this.y, 37, 37);
      this.context.fillStyle = _constants.COLOR;
    }
  }]);

  return OctaveSwitch;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fmSynth = function () {
  function fmSynth(ctx) {
    _classCallCheck(this, fmSynth);

    this.context = ctx;
    this.decay = 0;
    this.prevOsc = null;
    this.config = {
      type: 'square'
    };
  }

  _createClass(fmSynth, [{
    key: 'newOsc',
    value: function newOsc() {
      return;
    }
  }, {
    key: 'setDecay',
    value: function setDecay(value) {
      this.decay = value;
    }
  }, {
    key: 'setWave',
    value: function setWave(value) {
      this.config.type = value;
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
      osc.type = this.config.type;

      var gainNode = this.context.createGain();
      gainNode.gain.value = 0.08;

      var panNode = this.context.createStereoPanner();
      panNode.pan.value = pan === 'left' ? -0.7 : 0.7;

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
    key: 'setupOscillators',
    value: function setupOscillators() {
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

      var _getModulator = this.getModulator(220, 'sine', 25),
          _getModulator2 = _slicedToArray(_getModulator, 2),
          modulator1 = _getModulator2[0],
          modulatorGain1 = _getModulator2[1];

      var _getModulator3 = this.getModulator(110, 'sawtooth', 20),
          _getModulator4 = _slicedToArray(_getModulator3, 2),
          modulator2 = _getModulator4[0],
          modulatorGain2 = _getModulator4[1];

      var _getModulator5 = this.getModulator(55, 'sawtooth', 25),
          _getModulator6 = _slicedToArray(_getModulator5, 2),
          modulator3 = _getModulator6[0],
          modulatorGain3 = _getModulator6[1];

      var _getModulator7 = this.getModulator(220, 'square', 30),
          _getModulator8 = _slicedToArray(_getModulator7, 2),
          modulator4 = _getModulator8[0],
          modulatorGain4 = _getModulator8[1];

      modulatorGain1.connect(modulator2.frequency);
      modulatorGain2.connect(osc1.frequency);
      modulatorGain3.connect(modulator4.frequency);
      modulatorGain4.connect(osc2.frequency);
      return [osc1, osc2, gainNode1, gainNode2, modulator1, modulator2, modulator3, modulator4, filter1, filter2];
    }
  }, {
    key: 'play',
    value: function play(tone, oct) {
      var _setupOscillators = this.setupOscillators(tone, oct),
          _setupOscillators2 = _slicedToArray(_setupOscillators, 10),
          osc1 = _setupOscillators2[0],
          osc2 = _setupOscillators2[1],
          gainNode1 = _setupOscillators2[2],
          gainNode2 = _setupOscillators2[3],
          modulator1 = _setupOscillators2[4],
          modulator2 = _setupOscillators2[5],
          modulator3 = _setupOscillators2[6],
          modulator4 = _setupOscillators2[7],
          filter1 = _setupOscillators2[8],
          filter2 = _setupOscillators2[9];

      modulator1.start();
      modulator2.start();
      modulator3.start();
      modulator4.start();
      osc1.start();
      osc2.start();

      osc1.detune.value = tone * 102;
      osc1.frequency.value = oct * 220;
      filter1.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03);
      gainNode1.gain.setTargetAtTime(0, this.context.currentTime + 0.1 + this.decay * 0.02, 0.05);

      osc2.detune.value = tone * 98;
      osc2.frequency.value = oct * 220;
      filter2.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03);
      gainNode2.gain.setTargetAtTime(0, this.context.currentTime + 0.1 + this.decay * 0.02, 0.05);

      osc1.stop(this.context.currentTime + 1);
      osc2.stop(this.context.currentTime + 1);
      modulator1.stop(this.context.currentTime + 1);
      modulator2.stop(this.context.currentTime + 1);
      modulator3.stop(this.context.currentTime + 1);
      modulator4.stop(this.context.currentTime + 1);
    }
  }]);

  return fmSynth;
}();

exports.default = fmSynth;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hat = function () {
  function Hat(ctx) {
    _classCallCheck(this, Hat);

    this.context = ctx;
    this.prevOsc = null;
  }

  _createClass(Hat, [{
    key: 'getNoise',
    value: function getNoise() {
      var noise = this.context.createBufferSource();
      noise.buffer = noiseBuffer(this.context);
      var noiseFilter = this.context.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 2500;
      noise.connect(noiseFilter);

      var noiseEnvelope = this.context.createGain();
      noiseEnvelope.gain.value = 0.4;
      noiseFilter.connect(noiseEnvelope);
      noiseEnvelope.connect(this.context.destination);
      return [noise, noiseEnvelope];
    }
  }, {
    key: 'play',
    value: function play(tone, oct) {
      if (this.prevOsc) {
        this.prevOsc.stop();
      }
      var time = oct === 1 ? 0.01 : 0.05;

      var _getNoise = this.getNoise(),
          _getNoise2 = _slicedToArray(_getNoise, 2),
          noise = _getNoise2[0],
          noiseEnvelope = _getNoise2[1];

      this.prevOsc = noise;
      noise.start();
      noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, time);
      noise.stop(this.context.currentTime + 0.30);
    }
  }]);

  return Hat;
}();

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KickSynth = function () {
  function KickSynth(ctx) {
    _classCallCheck(this, KickSynth);

    this.context = ctx;
    this.decay = 0;
    this.config = {
      type: 'sine'
    };
  }

  _createClass(KickSynth, [{
    key: 'newOsc',
    value: function newOsc() {
      return;
    }
  }, {
    key: 'setDecay',
    value: function setDecay(value) {
      this.decay = value;
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators(tone) {
      var osc = this.context.createOscillator();
      var blipOsc = this.context.createOscillator();
      var gain = this.context.createGain();
      var blipGain = this.context.createGain();
      osc.frequency.value = 55;
      blipOsc.frequency.value = 440;
      osc.detune.value = tone * 100;
      blipOsc.detune.value = tone * 100;
      osc.connect(gain);
      blipOsc.connect(blipGain);
      gain.connect(this.context.destination);
      blipGain.connect(this.context.destination);
      return [osc, gain, blipOsc, blipGain];
    }
  }, {
    key: 'play',
    value: function play(tone) {
      var _getOscillators = this.getOscillators(tone),
          _getOscillators2 = _slicedToArray(_getOscillators, 4),
          osc = _getOscillators2[0],
          gain = _getOscillators2[1],
          blipOsc = _getOscillators2[2],
          blipGain = _getOscillators2[3];

      osc.start();
      blipOsc.start();
      gain.gain.setTargetAtTime(0, this.context.currentTime, 0.07 + this.decay * 0.01);
      blipGain.gain.setTargetAtTime(0, this.context.currentTime, 0.10);
      blipOsc.frequency.setTargetAtTime(55, this.context.currentTime, 0.05);
      osc.stop(this.context.currentTime + 1);
      blipOsc.stop(this.context.currentTime + 1);
    }
  }]);

  return KickSynth;
}();

exports.default = KickSynth;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeadSynth = function () {
  function LeadSynth(ctx) {
    _classCallCheck(this, LeadSynth);

    this.context = ctx;
    this.previousTone = 0;
    this.previousOct = 1;
    this.decay = 0;
    this.prevOsc = null;
    this.config = {
      type: 'sine'
    };
  }

  _createClass(LeadSynth, [{
    key: 'newOsc',
    value: function newOsc() {
      return;
    }
  }, {
    key: 'setDecay',
    value: function setDecay(value) {
      this.decay = value;
    }
  }, {
    key: 'setWave',
    value: function setWave(value) {
      this.config.type = value;
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators(tone, oct) {
      this.previousTone = tone;
      this.previousOct = oct;

      var osc = this.context.createOscillator();
      osc.detune.value = this.previousTone * 100;
      osc.frequency.value = this.previousOct * 220;
      osc.type = this.config.type;

      var gainNode = this.context.createGain();
      gainNode.gain.value = 0;

      var filter = this.context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 0;

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.context.destination);

      return [osc, gainNode, filter];
    }
  }, {
    key: 'play',
    value: function play(tone, oct) {
      if (this.prevOsc) this.prevOsc.stop();

      var _getOscillators = this.getOscillators(tone, oct),
          _getOscillators2 = _slicedToArray(_getOscillators, 3),
          osc = _getOscillators2[0],
          gainNode = _getOscillators2[1],
          filter = _getOscillators2[2];

      this.prevOsc = osc;

      osc.start();

      osc.detune.setTargetAtTime(tone * 100, this.context.currentTime, 0.03);
      osc.frequency.setTargetAtTime(oct * 440, this.context.currentTime, 0.03);
      gainNode.gain.setTargetAtTime(0.4, this.context.currentTime, 0.001);
      gainNode.gain.setTargetAtTime(0, this.context.currentTime + 0.1 + this.decay * 0.02, 0.05);
      filter.frequency.setTargetAtTime(1000, this.context.currentTime, 0.03);

      osc.stop(this.context.currentTime + 1);
    }
  }]);

  return LeadSynth;
}();

exports.default = LeadSynth;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snare = function () {
  function Snare(ctx) {
    _classCallCheck(this, Snare);

    this.context = ctx;
    this.config = {
      type: 'triangle'
    };
  }

  _createClass(Snare, [{
    key: 'getNoise',
    value: function getNoise() {
      var noise = this.context.createBufferSource();
      noise.buffer = noiseBuffer(this.context);
      var noiseFilter = this.context.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;
      noise.connect(noiseFilter);

      var noiseEnvelope = this.context.createGain();
      noiseFilter.connect(noiseEnvelope);
      noiseEnvelope.connect(this.context.destination);
      return [noise, noiseEnvelope];
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators() {
      var osc = this.context.createOscillator();
      osc.type = this.config.type;

      var gain = this.context.createGain();
      osc.connect(gain);
      gain.connect(this.context.destination);
      osc.frequency.value = 150;
      return [osc, gain];
    }
  }, {
    key: 'play',
    value: function play(tone) {
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
  }]);

  return Snare;
}();

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeySynth = function () {
  function KeySynth(ctx) {
    _classCallCheck(this, KeySynth);

    this.context = ctx;
    this.config = {
      type: 'sawtooth'
    };
    this.filterValue = 0;
  }

  _createClass(KeySynth, [{
    key: 'newOsc',
    value: function newOsc() {
      return;
    }
  }, {
    key: 'setFilter',
    value: function setFilter(value) {
      this.filterValue = value;
    }
  }, {
    key: 'getOscillators',
    value: function getOscillators(tone, oct) {
      var _this = this;

      var osc = [this.context.createOscillator(), this.context.createOscillator(), this.context.createOscillator()];
      var gain = [this.context.createGain(), this.context.createGain(), this.context.createGain()];
      var filters = [this.context.createBiquadFilter(), this.context.createBiquadFilter()];
      filters[0].frequency.value = 1000;
      filters[1].frequency.value = 1000;
      osc[0].frequency.value = 55 * oct;
      osc[1].frequency.value = 55 * oct;
      osc[2].frequency.value = 110 * oct;
      osc[0].detune.value = tone * 100;
      osc[1].detune.value = tone * 101;
      osc[2].detune.value = tone * 99;
      osc.forEach(function (o, i) {
        o.type = _this.config.type;
        if (!i) {
          o.connect(gain[i]);
        } else {
          o.connect(filters[i - 1]);
          filters[i - 1].connect(gain[i]);
        }
        gain[i].connect(_this.context.destination);
      });
      osc[0].type = 'triangle';
      return [osc, gain, filters];
    }
  }, {
    key: 'play',
    value: function play(tone, oct) {
      var _this2 = this;

      var _getOscillators = this.getOscillators(tone, oct),
          _getOscillators2 = _slicedToArray(_getOscillators, 3),
          osc = _getOscillators2[0],
          gain = _getOscillators2[1],
          filters = _getOscillators2[2];

      var duration = 100;
      osc.forEach(function (o, i) {
        o.start();
        if (i > 0) {
          filters[1].frequency.setTargetAtTime(_this2.filterValue * 1000, _this2.context.currentTime, 0.05);
        }
        gain[i].gain.setTargetAtTime(0, _this2.context.currentTime, 0.035);
        o.stop(_this2.context.currentTime + 0.5);
      });
    }
  }]);

  return KeySynth;
}();

exports.default = KeySynth;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

var _switch = __webpack_require__(4);

var _note = __webpack_require__(2);

var _note2 = _interopRequireDefault(_note);

var _classes = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('synth');
var ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif';
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var state = new _state2.default(audioCtx);

for (var i = 0; i < 16; i++) {
  state.moduleMap[i + 2 + '/12'] = new _switch.OctaveSwitch(i, 'hat', state, ctx);
  state.moduleMap[i + 2 + '/13'] = new _switch.BinSwitch(i, 'snare', state, ctx);
  state.moduleMap[i + 2 + '/14'] = new _note2.default(i, 'kick', state, ctx);
  state.moduleMap[i + 2 + '/15'] = new _switch.BinSwitch(i, 'kick', state, ctx);

  state.moduleMap[i + 2 + '/5'] = new _note2.default(i, 'fmSynth', state, ctx);
  state.moduleMap[i + 2 + '/6'] = new _switch.OctaveSwitch(i, 'fmSynth', state, ctx);
  state.moduleMap[i + 2 + '/7'] = new _note2.default(i, 'leadSynth', state, ctx);
  state.moduleMap[i + 2 + '/8'] = new _switch.OctaveSwitch(i, 'leadSynth', state, ctx);
  state.moduleMap[i + 2 + '/9'] = new _note2.default(i, 'key', state, ctx);
  state.moduleMap[i + 2 + '/10'] = new _switch.OctaveSwitch(i, 'key', state, ctx);

  state.moduleMap[i + 2 + '/2'] = new _classes.Blinker(i, state, ctx);
}
/* Play button */
state.blocks['0/0'] = new _classes.PlayBtn(ctx, state, 0, 0);
/* 4 Beat markers */
state.blocks['2/16'] = new _classes.BeatMarker(ctx, 2 * 40, 16 * 40);
state.blocks['6/16'] = new _classes.BeatMarker(ctx, 6 * 40, 16 * 40);
state.blocks['10/16'] = new _classes.BeatMarker(ctx, 10 * 40, 16 * 40);
state.blocks['14/16'] = new _classes.BeatMarker(ctx, 14 * 40, 16 * 40);
/* Instrument names */
state.blocks['0/6'] = new _classes.Word('FM', ctx, 0, 6 * 40);
state.blocks['0/8'] = new _classes.Word('Lead', ctx, 0, 8 * 40);
state.blocks['0/9'] = new _classes.Word('Bass', ctx, 0, 10 * 40);
state.blocks['0/15'] = new _classes.Word('Kick', ctx, 0, 15 * 40);
state.blocks['0/13'] = new _classes.Word('Snare', ctx, 0, 13 * 40);
state.blocks['0/12'] = new _classes.Word('Hat', ctx, 0, 12 * 40);

var updateKickDecay = state.instruments.kick.setDecay.bind(state.instruments.kick);
state.blocks['18/15'] = new _classes.Word('Decay', ctx, 18 * 40, 15 * 40);
state.blocks['19/15'] = new _classes.Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateKickDecay, ctx, 19 * 40 + 10, 15 * 40);

var updateLeadDecay = state.instruments.leadSynth.setDecay.bind(state.instruments.leadSynth);
state.blocks['18/8'] = new _classes.Word('Decay', ctx, 18 * 40, 8 * 40);
state.blocks['19/8'] = new _classes.Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateLeadDecay, ctx, 19 * 40 + 10, 8 * 40);

var updateBassFilter = state.instruments.key.setFilter.bind(state.instruments.key);
state.blocks['18/10'] = new _classes.Word('Filter', ctx, 18 * 40, 10 * 40);
state.blocks['19/10'] = new _classes.Options([0, 1, 2, 3, 4, 5, 6], updateBassFilter, ctx, 19 * 40 + 10, 10 * 40);

var updateLeadWave = state.instruments.leadSynth.setWave.bind(state.instruments.leadSynth);
state.blocks['21/8'] = new _classes.Word('Wave', ctx, 21 * 40, 8 * 40);
state.blocks['22/8'] = new _classes.Options(['sine', 'square', 'sawtooth'], updateLeadWave, ctx, 22 * 40 + 5, 8 * 40);

var pageButton = new _classes.PageButton(state, ctx, 2 * 40, 0);
state.blocks['2/0'] = pageButton;
state.blocks['3/0'] = pageButton;
state.blocks['4/0'] = pageButton;
state.blocks['5/0'] = pageButton;

state.blocks['7/0'] = new _classes.Word('Copy', ctx, 7 * 40, 0, state.copyPage.bind(state));
state.blocks['8/0'] = new _classes.Word('Paste', ctx, 8 * 40, 0, state.pastePage.bind(state));

canvas.onclick = function (e) {
  var x = Math.floor(e.clientX / 40);
  var y = Math.floor(e.clientY / 40);
  var key = x + '/' + y;
  var module = state.blocks[key];
  if (module) {
    state.blocks[key].handleClick(x, y);
  }
};

state.initScreen();

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map