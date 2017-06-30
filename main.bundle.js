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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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
var COLOR = exports.COLOR = 'white';
var LOOP_LENGTH = exports.LOOP_LENGTH = 16;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kick = __webpack_require__(14);

var _kick2 = _interopRequireDefault(_kick);

var _leadSynth = __webpack_require__(15);

var _leadSynth2 = _interopRequireDefault(_leadSynth);

var _fm = __webpack_require__(12);

var _fm2 = _interopRequireDefault(_fm);

var _snare = __webpack_require__(16);

var _snare2 = _interopRequireDefault(_snare);

var _hat = __webpack_require__(13);

var _hat2 = _interopRequireDefault(_hat);

var _constants = __webpack_require__(1);

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
    this.moduleMap = {};
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
    this.blinkers = [];
    this.step = 0;
    this.context = audioCtx;
    // this.instruments = {
    //   bass: new BassSynth(audioCtx),
    //   kick: new KickSynth(audioCtx),
    //   snare: new Snare(audioCtx),
    //   fm: new fm(audioCtx),
    //   lead: new LeadSynth(audioCtx),
    //   hat: new Hat(audioCtx)
    // }
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
        if (this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle
        /* for each instrument pass the step object for this page and beat into the play method */
        ();Object.keys(this.steps).forEach(function (type) {
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blinker = function () {
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

exports.default = Blinker;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _synth = __webpack_require__(17);

var _synth2 = _interopRequireDefault(_synth);

var _switch = __webpack_require__(20);

var _note = __webpack_require__(19);

var _note2 = _interopRequireDefault(_note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InstrumentWindow = function () {
  function InstrumentWindow(state, ctx, x, y) {
    _classCallCheck(this, InstrumentWindow);

    this.x = x;
    this.y = y;
    this.parent = state;
    this.context = ctx;
    this.instrument = new _synth2.default();
    this.moduleMap = {};
    this.build();
  }

  _createClass(InstrumentWindow, [{
    key: 'build',
    value: function build() {
      for (var i = 0; i < 16; i++) {
        this.moduleMap[i + '/9'] = new _note2.default(i, this, this.context);
        this.moduleMap[i + '/10'] = new _switch.OctaveSwitch(i, this, this.context);
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(message) {
      return this.parent.trigger(message);
    }
  }, {
    key: 'getPage',
    value: function getPage() {
      return this.trigger({ type: 'get_page', instrument: this.instrument.name });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this = this;

      Object.keys(this.moduleMap).forEach(function (key) {
        var _key$split = key.split('/'),
            _key$split2 = _slicedToArray(_key$split, 2),
            x = _key$split2[0],
            y = _key$split2[1];

        x = parseInt(x) * 40;
        y = parseInt(y) * 40;
        x += _this.x;
        y += _this.y;
        var module = _this.moduleMap[key];
        if (module.setPos) module.setPos(x, y);
        module.render();
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
      this.moduleMap[xCell + '/' + yCell].handleClick(x, y, innerX, innerY);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Options = function () {
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

exports.default = Options;

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Volume = function () {
  function Volume(state, ctx, x, y, cb) {
    _classCallCheck(this, Volume);

    this.context = ctx;
    this.state = state;
    this.value = 8;
    this.x = x;
    this.y = y;
    this.callback = cb;
  }

  _createClass(Volume, [{
    key: 'render',
    value: function render() {
      this.context.fillStyle = 'black';
      this.context.clearRect(this.x, this.y, 40, 40);
      this.context.fillText('+', this.x + 20, this.y + 13, 40);
      this.context.fillText('-', this.x + 21, this.y + 37, 40);
      this.context.fillText(this.value, this.x, this.y + 25, 40);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(x, y, innerX, innerY) {
      var section = Math.floor(innerY / 20);
      this.value = Math.abs((section ? this.value - 1 : this.value + 1) % 10);
      this.callback(this.value);
      this.render();
    }
  }]);

  return Volume;
}();

exports.default = Volume;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fmSynth = function (_Listener) {
  _inherits(fmSynth, _Listener);

  function fmSynth(ctx) {
    _classCallCheck(this, fmSynth);

    var _this = _possibleConstructorReturn(this, (fmSynth.__proto__ || Object.getPrototypeOf(fmSynth)).call(this));

    _this.volume = 8;
    _this.context = ctx;
    _this.decay = 0;
    _this.prevOsc = null;
    _this.oscillators = {};
    _this.playing = false;
    _this.waveform = 'square';
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
      this.oscillators.gainNode1.gain.setTargetAtTime(0, this.context.currentTime + this.decay * 0.02, 0.05);
      this.oscillators.gainNode2.gain.setTargetAtTime(0, this.context.currentTime + this.decay * 0.02, 0.05);
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

      var _getModulator = this.getModulator(110, 'sine', 35),
          _getModulator2 = _slicedToArray(_getModulator, 2),
          modulatorA = _getModulator2[0],
          modulatorGainA = _getModulator2[1];

      var _getModulator3 = this.getModulator(220, 'sine', 30),
          _getModulator4 = _slicedToArray(_getModulator3, 2),
          modulatorB = _getModulator4[0],
          modulatorGainB = _getModulator4[1];

      var _getModulator5 = this.getModulator(110, 'sawtooth', 10),
          _getModulator6 = _slicedToArray(_getModulator5, 2),
          modulator1 = _getModulator6[0],
          modulatorGain1 = _getModulator6[1];

      var _getModulator7 = this.getModulator(220, 'square', 20),
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
    key: 'play',
    value: function play(_ref) {
      var step = _ref.step,
          note = _ref.note,
          hold = _ref.hold;

      if (step && !hold) {
        this.stopAll();

        var _setupOscillators = this.setupOscillators(note, step),
            _setupOscillators2 = _slicedToArray(_setupOscillators, 10),
            osc1 = _setupOscillators2[0],
            osc2 = _setupOscillators2[1],
            gainNode1 = _setupOscillators2[2],
            gainNode2 = _setupOscillators2[3],
            modulatorA = _setupOscillators2[4],
            modulatorB = _setupOscillators2[5],
            modulator1 = _setupOscillators2[6],
            modulator2 = _setupOscillators2[7],
            filter1 = _setupOscillators2[8],
            filter2 = _setupOscillators2[9];

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
        this.oscillators.osc1.detune.value = note * 102;
        this.oscillators.osc1.frequency.value = step * 220;
        this.oscillators.osc2.detune.value = note * 98;
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

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
      blipGain.gain.value = this.volume * 0.1;
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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

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

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Listener2 = __webpack_require__(0);

var _Listener3 = _interopRequireDefault(_Listener2);

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
    _this.filterValue = 0;
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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

var _PlayBtn = __webpack_require__(8);

var _PlayBtn2 = _interopRequireDefault(_PlayBtn);

var _BeatMarker = __webpack_require__(3);

var _BeatMarker2 = _interopRequireDefault(_BeatMarker);

var _Blinker = __webpack_require__(4);

var _Blinker2 = _interopRequireDefault(_Blinker);

var _Word = __webpack_require__(11);

var _Word2 = _interopRequireDefault(_Word);

var _Options = __webpack_require__(6);

var _Options2 = _interopRequireDefault(_Options);

var _PageButton = __webpack_require__(7);

var _PageButton2 = _interopRequireDefault(_PageButton);

var _Tempo = __webpack_require__(9);

var _Tempo2 = _interopRequireDefault(_Tempo);

var _Volume = __webpack_require__(10);

var _Volume2 = _interopRequireDefault(_Volume);

var _InstrumentWindow = __webpack_require__(5);

var _InstrumentWindow2 = _interopRequireDefault(_InstrumentWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('synth');
var ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif';
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var state = new _state2.default(audioCtx);

// for(var i = 0; i < 16; i++){
//   state.moduleMap[`${i+2}/12`] = new OctaveSwitch(i,'hat', state, ctx)
//   state.moduleMap[`${i+2}/13`] = new BinSwitch(i,'snare', state, ctx)
//   state.moduleMap[`${i+2}/14`] = new Note(i,'kick', state, ctx)
//   state.moduleMap[`${i+2}/15`] = new BinSwitch(i,'kick', state, ctx)
//
//   state.moduleMap[`${i+2}/5`] = new Note(i,'fm', state, ctx)
//   state.moduleMap[`${i+2}/6`] = new OctaveSwitch(i,'fm', state, ctx)
//   state.moduleMap[`${i+2}/7`] = new Note(i,'lead', state, ctx)
//   state.moduleMap[`${i+2}/8`] = new OctaveSwitch(i,'lead', state, ctx)
//   state.moduleMap[`${i+2}/9`] = new Note(i,'bass', state, ctx)
//   state.moduleMap[`${i+2}/10`] = new OctaveSwitch(i,'bass', state, ctx)
//
//   state.moduleMap[`${i+2}/2`] = new Blinker(i, state, ctx)
// }
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
  return state.message({ type: 'copy_page' });
}));
state.blocks['8/0'] = state.push(new _Word2.default('Paste', ctx, 8 * 40, 0, function () {
  return state.message({ type: 'paste_page' });
})
/* Tempo */
);var tempo = state.push(new _Tempo2.default(state, ctx, 11 * 40, 0));
state.blocks['11/0'] = tempo;
state.blocks['12/0'] = tempo;

var toggleSwing = function toggleSwing() {
  return state.message({ type: 'toggle_swing' });
};
state.blocks['14/0'] = state.push(new _Options2.default(['straight', 'swing'], toggleSwing, ctx, 14 * 40, 0));

var instrumentWindow = state.push(new _InstrumentWindow2.default(state, ctx, 4 * 40, 3 * 40));
for (var i = 4; i < 12; i++) {
  for (var k = 3; k < 16; k++) {
    state.blocks[i + '/' + k] = instrumentWindow;
  }
}

// /* 4 Beat markers */
// state.blocks['2/16'] = new BeatMarker(ctx, 2*40, 16*40)
// state.blocks['6/16'] = new BeatMarker(ctx, 6*40, 16*40)
// state.blocks['10/16'] = new BeatMarker(ctx, 10*40, 16*40)
// state.blocks['14/16'] = new BeatMarker(ctx, 14*40, 16*40)
// /* Instrument names & volume control */
// state.blocks['0/6'] = new Word('FM', ctx, 0, 6*40)
// state.blocks['1/6'] = new Volume(state, ctx, 1*40, 6*40, (value) => {
//   state.instruments.fm.setProp({ property: 'volume', value })
// })
// state.blocks['0/8'] = new Word('Lead', ctx, 0, 8*40)
// state.blocks['1/8'] = new Volume(state, ctx, 1*40, 8*40, (value) => {
//   state.instruments.lead.setProp({ property: 'volume', value })
// })
// state.blocks['0/10'] = new Word('Bass', ctx, 0, 10*40)
// state.blocks['1/10'] = new Volume(state, ctx, 1*40, 10*40, (value) => {
//   state.instruments.bass.setProp({ property: 'volume', value })
// })
// state.blocks['0/15'] = new Word('Kick', ctx, 0, 15*40)
// state.blocks['1/15'] = new Volume(state, ctx, 1*40, 15*40, (value) => {
//   state.instruments.kick.setProp({ property: 'volume', value })
// })
// state.blocks['0/13'] = new Word('Snr', ctx, 0, 13*40)
// state.blocks['1/13'] = new Volume(state, ctx, 1*40, 13*40, (value) => {
//   state.instruments.snare.setProp({ property: 'volume', value })
// })
// state.blocks['0/12'] = new Word('Hat', ctx, 0, 12*40)
// state.blocks['1/12'] = new Volume(state, ctx, 1*40, 12*40, (value) => {
//   state.instruments.hat.setProp({ property: 'volume', value })
// })
//
// const updateKickDecay = (value) => state.instruments.kick.setProp({ property: 'decay', value })
// state.blocks['18/15'] = new Word('Decay', ctx, 18*40, 15*40)
// state.blocks['19/15'] = new Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateKickDecay, ctx, 19*40+10, 15*40)
//
// const updateLeadDecay = (value) => state.instruments.lead.setProp({ property: 'decay', value })
// state.blocks['18/8'] = new Word('Decay', ctx, 18*40, 8*40)
// state.blocks['19/8'] = new Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateLeadDecay, ctx, 19*40+10, 8*40)
//
// const updateBassFilter = (value) => state.instruments.bass.setProp({ property: 'filterValue', value })
// state.blocks['18/10'] = new Word('Filter', ctx, 18*40, 10*40)
// state.blocks['19/10'] = new Options([0, 1, 2, 3, 4, 5, 6], updateBassFilter, ctx, 19*40+10, 10*40)
//
// const updateLeadWave = (value) => state.instruments.lead.setProp({ property: 'waveform', value })
// state.blocks['21/8'] = new Word('Wave', ctx, 21*40, 8*40)
// state.blocks['22/8'] = new Options(['sine','square', 'sawtooth'], updateLeadWave, ctx, 22*40+5, 8*40)

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

window.onkeydown = function (e) {
  if (e.code && e.code === 'Space') {
    state.togglePlay();
    playBtn.render();
  }
};

state.drawScreen();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
  function Note(idx, parent, context) {
    _classCallCheck(this, Note);

    this.notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'], this.parent = parent;
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OctaveSwitch = exports.BinSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

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
  function OctaveSwitch(idx, state, ctx) {
    _classCallCheck(this, OctaveSwitch);

    this.idx = idx;
    this.state = state;
    this.context = ctx;
    this.x = null;
    this.y = null;
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
    key: 'setPos',
    value: function setPos(x, y) {
      this.x = x;
      this.y = y;
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