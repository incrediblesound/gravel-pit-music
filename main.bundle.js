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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Listener {
  setProp(action) {
    if (Array.isArray(action.property)) {
      // flimsy, just for setting array indexes of properties
      this[action.property[0]][action.property[1]] = action.value;
    } else {
      this[action.property] = action.value;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Listener;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueInput__ = __webpack_require__(23);


class ControlValue {
  constructor(ctx, x, y, text, initialValue, maxValue, cb) {
    this.context = ctx;
    this.x = x;
    this.y = y;
    this.text = text;
    this.valueInput = new __WEBPACK_IMPORTED_MODULE_0__ValueInput__["a" /* default */]({
      ctx, x: x + 80, y, initialValue, maxValue, cb
    });
  }
  handleClick(x, y, innerX, innerY) {
    this.valueInput.handleClick(x, y, innerX, innerY);
  }
  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 120, 40);
    this.context.clearRect(this.x + 1, this.y + 1, 118, 38);
    this.context.fillText(this.text, this.x + 5, this.y + 25, 80);
    this.valueInput.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControlValue;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__ = __webpack_require__(3);




class KeySynth extends __WEBPACK_IMPORTED_MODULE_0__Listener__["a" /* default */] {
  constructor(ctx) {
    super();
    this.name = 'bass';
    this.volume = 8;
    this.context = ctx;
    this.oscillators = {};
    this.filterValue = 1;
    this.waveform = 'sawtooth';
    this.playing = false;
  }
  stopAll() {
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
  makeOscillator(waveform) {
    const osc = this.context.createOscillator();
    osc.type = waveform;
    return osc;
  }
  getOscillators(note, oct) {
    const osc1 = this.makeOscillator('triangle');
    const osc2 = this.makeOscillator(this.waveform);
    const osc3 = this.makeOscillator(this.waveform);
    const gain = [this.context.createGain(), this.context.createGain(), this.context.createGain()];
    const filters = [this.context.createBiquadFilter(), this.context.createBiquadFilter()];
    filters[0].frequency.value = this.filterValue * 500;
    filters[1].frequency.value = this.filterValue * 500;

    osc1.connect(gain[0]);
    osc2.connect(filters[0]);
    osc3.connect(filters[1]);
    filters[0].connect(gain[1]);
    filters[1].connect(gain[2]);
    gain.forEach(g => {
      g.gain.value = this.volume * 0.1 - this.filterValue * 0.05;
      g.connect(this.context.destination);
    });

    return [osc1, osc2, osc3, gain, filters];
  }
  play({ step, note, hold }) {
    if (step && !hold) {
      this.stopAll();
      let [osc1, osc2, osc3, gain, filters] = this.getOscillators(note, step);
      this.oscillators = {
        osc1, osc2, osc3,
        gain, filters
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
}
/* harmony export (immutable) */ __webpack_exports__["b"] = KeySynth;


const bassControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.bass.volume;
  const volume = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y, 'Volume', initialVolume, 10, value => {
    state.instruments.bass.setProp({ property: 'volume', value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  const initialFilter = state.instruments.bass.filterValue;
  const filter = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 3 * 40, y, 'Filter', initialFilter, 20, value => {
    state.instruments.bass.setProp({ property: 'filterValue', value });
  });
  modules.push(filter);
  moduleMap['3/0'] = filter;
  moduleMap['4/0'] = filter;
  moduleMap['5/0'] = filter;

  const waveform = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x + 7 * 40, y, 'Waveform', ['triangle', 'square', 'sawtooth'], state.instruments.bass.waveform, value => {
    state.instruments.bass.setProp({ property: 'waveform', value });
  });
  modules.push(waveform);
  moduleMap['7/0'] = waveform;
  moduleMap['8/0'] = waveform;
  moduleMap['9/0'] = waveform;
  moduleMap['10/0'] = waveform;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = bassControlFunction;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Options__ = __webpack_require__(4);


class ControlOptions {
  constructor(ctx, x, y, text, options, currentValue, cb) {
    this.context = ctx;
    this.x = x;
    this.y = y;
    this.text = text;
    this.valueInput = new __WEBPACK_IMPORTED_MODULE_0__Options__["a" /* default */]({
      options, currentValue, cb, ctx, x: x + 80, y
    });
  }
  handleClick(x, y, innerX, innerY) {
    this.valueInput.handleClick(x, y, innerX, innerY);
  }
  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 120, 40);
    this.context.clearRect(this.x + 1, this.y + 1, 118, 38);
    this.context.fillText(this.text, this.x + 5, this.y + 25, 80);
    this.valueInput.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControlOptions;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Options {
  constructor({ options, currentValue, cb, ctx, x, y }) {
    this.context = ctx;
    this.idx = currentValue !== undefined ? options.indexOf(currentValue) : 0;
    this.options = options;
    this.callBack = cb;
    this.x = x;
    this.y = y;
  }
  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 80, 40);
    this.context.clearRect(this.x + 1, this.y + 1, 78, 38);
    const text = this.options[this.idx];
    const textWidth = Math.ceil(this.context.measureText(text).width);
    const offset = 40 - textWidth / 2;
    this.context.fillText(text, this.x + offset, this.y + 25, 39);
  }
  handleClick() {
    this.idx = (this.idx + 1) % this.options.length;
    this.render();
    this.callBack(this.options[this.idx]);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Options;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const COLOR = 'white';
/* harmony export (immutable) */ __webpack_exports__["a"] = COLOR;

const LOOP_LENGTH = 16;
/* harmony export (immutable) */ __webpack_exports__["b"] = LOOP_LENGTH;

const SEQUENCE_LENGTH = 4;
/* harmony export (immutable) */ __webpack_exports__["c"] = SEQUENCE_LENGTH;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__ = __webpack_require__(3);




const fmModeMethods = {
  'parallel': 'setupOscillators_A',
  'vertical': 'setupOscillators_B'
};

class fmSynth extends __WEBPACK_IMPORTED_MODULE_0__Listener__["a" /* default */] {
  constructor(ctx) {
    super();
    this.volume = 8;
    this.mod1Oct = 0;
    this.mod2Oct = 0;
    this.context = ctx;
    this.decay = 1;
    this.prevOsc = null;
    this.oscillators = {};
    this.playing = false;
    this.waveformOptions = ['square', 'sine', 'sawtooth'];
    this.waveform = 'square';
    this.fmMode = 'parallel';
  }
  storeOscillators(data) {
    Object.keys(data).forEach(key => {
      this.oscillators[key] = data[key];
    });
  }
  stopAll() {
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
  getModulator(oct, wave, gain) {
    const modulator = this.context.createOscillator();
    const modulatorGain = this.context.createGain();
    modulator.type = wave;
    modulator.frequency.value = oct;
    modulatorGain.gain.value = gain;
    modulator.connect(modulatorGain);
    return [modulator, modulatorGain];
  }
  getOscillator(pan) {
    const osc = this.context.createOscillator();
    osc.type = this.waveform;

    const gainNode = this.context.createGain();
    gainNode.gain.value = this.volume * 0.02;

    const panNode = this.context.createStereoPanner();

    let panValue = 0;
    if (pan === 'left') panValue = -0.7;
    if (pan === 'right') panValue = 0.7;
    panNode.pan.value = panValue;

    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 0;

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(panNode);
    panNode.connect(this.context.destination);
    return [osc, filter, gainNode];
  }
  setupOscillators_A() {
    const [osc1, filter1, gainNode1] = this.getOscillator('left');
    const [osc2, filter2, gainNode2] = this.getOscillator('right');
    const [modulatorA, modulatorGainA] = this.getModulator(5.5 * (this.mod1Oct * 5), 'sawtooth', 70);
    const [modulatorB, modulatorGainB] = this.getModulator(5.5 * (this.mod2Oct * 10), 'sine', 90);
    const [modulator1, modulatorGain1] = this.getModulator(5.5 * (this.mod1Oct * 5), 'sawtooth', 50);
    const [modulator2, modulatorGain2] = this.getModulator(5.5 * (this.mod2Oct * 10), 'sine', 40);
    modulatorGainA.connect(modulator1.frequency);
    modulatorGainB.connect(modulator2.frequency);
    modulatorGain1.connect(osc1.frequency);
    modulatorGain2.connect(osc2.frequency);
    return [osc1, osc2, gainNode1, gainNode2, modulatorA, modulatorB, modulator1, modulator2, filter1, filter2];
  }
  setupOscillators_B() {
    const [osc1, filter1, gainNode1] = this.getOscillator();
    const [osc2, filter2, gainNode2] = this.getOscillator();
    const [modulatorA, modulatorGainA] = this.getModulator(5.5 * (this.mod1Oct * 5), 'square', 35);
    const [modulatorB, modulatorGainB] = this.getModulator(5.5 * (this.mod2Oct * 10), 'sine', 50);
    const [modulator1, modulatorGain1] = this.getModulator(5.5 * (this.mod1Oct * 5), 'sine', 30);
    const [modulator2, modulatorGain2] = this.getModulator(5.5 * (this.mod2Oct * 10), 'sine', 35);
    modulatorGainA.connect(modulator1.frequency);
    modulatorGain1.connect(modulatorB.frequency);
    modulatorGainB.connect(osc1.frequency);
    gainNode1.connect(osc2.frequency);
    return [osc1, osc2, gainNode1, gainNode2, modulatorA, modulatorB, modulator1, modulator2, filter1, filter2];
  }
  play({ step, note, hold }) {
    if (step && !hold) {
      this.stopAll();
      const methodName = fmModeMethods[this.fmMode];
      const [osc1, osc2, gainNode1, gainNode2, modulatorA, modulatorB, modulator1, modulator2, filter1, filter2] = this[methodName](note, step);
      this.storeOscillators({
        osc1, osc2,
        modulatorA, modulatorB,
        modulator1, modulator2,
        gainNode1, gainNode2
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
}
/* harmony export (immutable) */ __webpack_exports__["b"] = fmSynth;


const fmControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.fm.volume;
  const volume = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y, 'Volume', initialVolume, 10, value => {
    state.instruments.fm.setProp({ property: 'volume', value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  const initialDecay = state.instruments.fm.decay;
  const decay = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y + 40, 'Decay', initialDecay, 9, value => {
    if (value === 0) value += 1;
    state.instruments.fm.setProp({ property: 'decay', value });
  });
  modules.push(decay);
  moduleMap['0/1'] = decay;
  moduleMap['1/1'] = decay;
  moduleMap['2/1'] = decay;

  const waveform = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x + 3 * 40, y, 'Waveform', ['square', 'sine', 'sawtooth'], state.instruments.fm.waveform, value => {
    state.instruments.fm.setProp({ property: 'waveform', value });
  });
  modules.push(waveform);
  moduleMap['3/0'] = waveform;
  moduleMap['4/0'] = waveform;
  moduleMap['5/0'] = waveform;
  moduleMap['6/0'] = waveform;

  const fmMode = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x + 3 * 40, y + 40, 'FM Mode', ['vertical', 'parallel'], state.instruments.fm.fmMode, value => {
    state.instruments.fm.setProp({ property: 'fmMode', value });
  });
  modules.push(fmMode);
  moduleMap['3/1'] = fmMode;
  moduleMap['4/1'] = fmMode;
  moduleMap['5/1'] = fmMode;
  moduleMap['6/1'] = fmMode;

  const initialMod1Oct = state.instruments.fm.mod1Oct;
  const mod1Oct = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 7 * 40, y, 'Mod1 Oct', initialMod1Oct, 5, value => {
    state.instruments.fm.setProp({ property: 'mod1Oct', value });
  });
  modules.push(mod1Oct);
  moduleMap['7/0'] = mod1Oct;
  moduleMap['8/0'] = mod1Oct;
  moduleMap['9/0'] = mod1Oct;

  const initialMod2Oct = state.instruments.fm.mod2Oct;
  const mod2Oct = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 7 * 40, y + 40, 'Mod2 Oct', initialMod2Oct, 5, value => {
    state.instruments.fm.setProp({ property: 'mod2Oct', value });
  });
  modules.push(mod2Oct);
  moduleMap['7/1'] = mod2Oct;
  moduleMap['8/1'] = mod2Oct;
  moduleMap['9/1'] = mod2Oct;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = fmControlFunction;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__ = __webpack_require__(1);



class Hat extends __WEBPACK_IMPORTED_MODULE_0__Listener__["a" /* default */] {
  constructor(ctx) {
    super();
    this.volume = 8;
    this.tone = 25;
    this.context = ctx;
    this.prevOsc = null;
    this.buffer = noiseBuffer(ctx);
  }
  getNoise() {
    const noise = this.context.createBufferSource();
    noise.buffer = this.buffer;
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = this.tone * 100;
    noise.connect(noiseFilter);

    const noiseEnvelope = this.context.createGain();
    noiseEnvelope.gain.value = this.volume * 0.1;
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.context.destination);
    return [noise, noiseEnvelope];
  }
  stopAll() {
    if (this.prevOsc) {
      this.prevOsc.stop(0);
    }
  }
  play({ step }) {
    if (step) {
      this.stopAll();
      const time = step === 1 ? 0.01 : 0.05;
      const [noise, noiseEnvelope] = this.getNoise();
      this.prevOsc = noise;
      noise.start(0);
      noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, time);
      noise.stop(this.context.currentTime + 0.30);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Hat;


function noiseBuffer(context) {
  const bufferSize = context.sampleRate;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const output = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

const hatControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.hat.volume;
  const volume = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y, 'Volume', initialVolume, 10, value => {
    state.instruments.hat.setProp({ property: 'volume', value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  const initialTone = state.instruments.hat.tone;
  const tone = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 3 * 40, y, 'Tone', initialTone, 50, value => {
    state.instruments.hat.setProp({ property: 'tone', value });
  });
  modules.push(tone);
  moduleMap['3/0'] = tone;
  moduleMap['4/0'] = tone;
  moduleMap['5/0'] = tone;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = hatControlFunction;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__ = __webpack_require__(1);



class KickSynth extends __WEBPACK_IMPORTED_MODULE_0__Listener__["a" /* default */] {
  constructor(ctx) {
    super();
    this.volume = 8;
    this.context = ctx;
    this.decay = 0;
    this.attack = 9;
    this.config = {
      type: 'sine'
    };
  }
  stopAll() {}
  getOscillators(note) {
    const osc = this.context.createOscillator();
    const blipOsc = this.context.createOscillator();
    const gain = this.context.createGain();
    const blipGain = this.context.createGain();
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
  play({ step, note }) {
    const [osc, gain, blipOsc, blipGain] = this.getOscillators(note);
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
}
/* harmony export (immutable) */ __webpack_exports__["b"] = KickSynth;


const kickControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.kick.volume;
  const volume = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y, 'Volume', initialVolume, 10, value => {
    state.instruments.kick.setProp({ property: 'volume', value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  const initialAttack = state.instruments.kick.attack;
  const attack = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y + 40, 'Attack', initialAttack, 10, value => {
    state.instruments.kick.setProp({ property: 'attack', value });
  });
  modules.push(attack);
  moduleMap['0/1'] = attack;
  moduleMap['1/1'] = attack;
  moduleMap['2/1'] = attack;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = kickControlFunction;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__ = __webpack_require__(3);




class LeadSynth extends __WEBPACK_IMPORTED_MODULE_0__Listener__["a" /* default */] {
  constructor(ctx) {
    super();
    this.volume = 8;
    this.context = ctx;
    this.previousTone = 0;
    this.previousOct = 1;
    this.decay = 0;
    this.filterValue = 0;
    this.initialFrequency = 0;
    this.prevOsc = null;
    this.playing = false;
    this.filterType = 'lowpass';
    this.Q = 0;
    this.octave = [1, 1];
    this.waveform = ['sine', 'sine'];
  }
  stopAll() {
    if (!this.prevOsc) return;
    this.prevGainNode.forEach(g => g.gain.setTargetAtTime(0, this.context.currentTime + 0.01 + this.decay * 0.02, 0.05));
    this.prevOsc.forEach(osc => osc.stop(this.context.currentTime + 1));
    this.prevOsc = null;
    this.playing = false;
  }
  getOscillators(note, oct, idx) {
    this.previousTone = note;
    this.previousOct = oct;

    const osc = this.context.createOscillator();
    osc.detune.value = this.previousTone * 100;
    osc.frequency.value = this.previousOct * (440 * this.octave[idx]);
    osc.type = this.waveform[idx];

    const gainNode = this.context.createGain();
    gainNode.gain.value = this.volume / 2 * 0.1;

    const filter = this.context.createBiquadFilter();
    filter.type = this.filterType;
    filter.Q.value = this.Q * 5;
    filter.frequency.value = this.initialFrequency ? this.initialFrequency * 1000 : 500;

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);

    return [osc, gainNode, filter];
  }
  play({ step, note, hold }) {
    if (step && !hold) {
      this.stopAll();
      const [osc1, gainNode1, filter1] = this.getOscillators(note, step, 0);
      const [osc2, gainNode2, filter2] = this.getOscillators(note, step, 1);
      this.prevOsc = [osc1, osc2];
      this.prevGainNode = [gainNode1, gainNode2];
      osc1.start();
      osc2.start();
      filter1.frequency.setTargetAtTime(this.filterValue * 1000, this.context.currentTime, 0.1);
      filter2.frequency.setTargetAtTime(this.filterValue * 1000, this.context.currentTime, 0.1);
      this.playing = true;
    }
    if (step && this.playing || hold && step && this.playing) {
      this.prevOsc.forEach(osc => osc.detune.setTargetAtTime(note * 100, this.context.currentTime, 0.03));
      this.prevOsc.forEach(osc => osc.frequency.setTargetAtTime(step * 440, this.context.currentTime, 0.03));
    }
    if (!step && this.prevOsc) {
      this.stopAll();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = LeadSynth;


const leadControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.lead.volume;
  const volume = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y, 'Volume', initialVolume, 10, value => {
    state.instruments.lead.setProp({ property: 'volume', value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  const waveform1 = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x + 4 * 40, y, 'Waveform 1', ['square', 'sine', 'sawtooth'], state.instruments.lead.waveform[0], value => {
    state.instruments.lead.setProp({ property: ['waveform', 0], value });
  });
  modules.push(waveform1);
  moduleMap['4/0'] = waveform1;
  moduleMap['5/0'] = waveform1;
  moduleMap['6/0'] = waveform1;
  moduleMap['7/0'] = waveform1;

  const waveform2 = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x + 4 * 40, y + 40, 'Waveform 2', ['square', 'sine', 'sawtooth'], state.instruments.lead.waveform[1], value => {
    state.instruments.lead.setProp({ property: ['waveform', 1], value });
  });
  modules.push(waveform2);
  moduleMap['4/1'] = waveform2;
  moduleMap['5/1'] = waveform2;
  moduleMap['6/1'] = waveform2;
  moduleMap['7/1'] = waveform2;

  const octave1 = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x, y + 40, 'Octave 1', [0.125, 0.25, 0.5, 1, 2], state.instruments.lead.octave[0], value => {
    state.instruments.lead.setProp({ property: ['octave', 0], value });
  });
  modules.push(octave1);
  moduleMap['0/1'] = octave1;
  moduleMap['1/1'] = octave1;
  moduleMap['2/1'] = octave1;
  moduleMap['3/1'] = octave1;

  const octave2 = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x, y + 80, 'Octave 2', [0.125, 0.25, 0.5, 1, 2], state.instruments.lead.octave[1], value => {
    state.instruments.lead.setProp({ property: ['octave', 1], value });
  });
  modules.push(octave2);
  moduleMap['0/2'] = octave2;
  moduleMap['1/2'] = octave2;
  moduleMap['2/2'] = octave2;
  moduleMap['3/2'] = octave2;

  const initialFilter = state.instruments.lead.filterValue;
  const filter = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 40 * 10, y, 'Filter End', initialFilter, 10, value => {
    state.instruments.lead.setProp({ property: 'filterValue', value });
  });
  modules.push(filter);
  moduleMap['10/0'] = filter;
  moduleMap['11/0'] = filter;
  moduleMap['12/0'] = filter;

  const initialFrequencyValue = state.instruments.lead.initialFrequency;
  const initialFrequency = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 40 * 8, y, 'Filter Start', initialFrequencyValue, 10, value => {
    state.instruments.lead.setProp({ property: 'initialFrequency', value });
  });
  modules.push(initialFrequency);
  moduleMap['8/0'] = initialFrequency;
  moduleMap['9/0'] = initialFrequency;
  moduleMap['10/0'] = initialFrequency;

  const filterType = new __WEBPACK_IMPORTED_MODULE_2__ui_InstrumentControlOptions__["a" /* default */](ctx, x + 11 * 40, y + 40, 'Filter Type', ['lowpass', 'highpass', 'bandpass', 'notch'], state.instruments.lead.filterType, value => {
    state.instruments.lead.setProp({ property: 'filterType', value });
  });
  modules.push(filterType);
  moduleMap['11/1'] = filterType;
  moduleMap['12/1'] = filterType;
  moduleMap['13/1'] = filterType;
  moduleMap['14/1'] = filterType;

  const initialQ = state.instruments.lead.Q;
  const controlQ = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 40 * 8, y + 40, 'Filter Q', initialQ, 10, value => {
    state.instruments.lead.setProp({ property: 'Q', value: value });
  });
  modules.push(controlQ);
  moduleMap['8/1'] = controlQ;
  moduleMap['9/1'] = controlQ;
  moduleMap['10/1'] = controlQ;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = leadControlFunction;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__ = __webpack_require__(1);



class Snare extends __WEBPACK_IMPORTED_MODULE_0__Listener__["a" /* default */] {
  constructor(ctx) {
    super();
    this.volume = 8;
    this.decay = 4;
    this.context = ctx;
    this.config = {
      type: 'triangle'
    };
    this.buffer = noiseBuffer(ctx);
  }
  setVolume(value) {
    this.volume = value;
  }
  stopAll() {}
  getNoise() {
    const noise = this.context.createBufferSource();
    noise.buffer = this.buffer;

    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    const noiseEnvelope = this.context.createGain();
    noiseEnvelope.gain.value = this.volume * 0.1;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.context.destination);
    return [noise, noiseEnvelope];
  }
  getOscillators() {
    const osc = this.context.createOscillator();
    osc.type = this.config.type;
    osc.frequency.value = 150;

    const gain = this.context.createGain();
    gain.gain.value = this.volume * 0.1;
    osc.connect(gain);
    gain.connect(this.context.destination);
    return [osc, gain];
  }
  play({ step }) {
    if (step) {
      const [osc, gain] = this.getOscillators();
      const [noise, noiseEnvelope] = this.getNoise();
      osc.start();
      noise.start();
      gain.gain.setTargetAtTime(0, this.context.currentTime, this.decay * 0.01);
      noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, this.decay * 0.01);
      osc.stop(this.context.currentTime + 0.30);
      noise.stop(this.context.currentTime + 0.30);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Snare;


function noiseBuffer(context) {
  const bufferSize = context.sampleRate;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const output = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

const snareControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.snare.volume;
  const volume = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x, y, 'Volume', initialVolume, 10, value => {
    state.instruments.snare.setProp({ property: 'volume', value });
  });
  modules.push(volume);
  moduleMap['0/0'] = volume;
  moduleMap['1/0'] = volume;
  moduleMap['2/0'] = volume;

  const initialDecay = state.instruments.snare.decay;
  const decay = new __WEBPACK_IMPORTED_MODULE_1__ui_InstrumentControlValue__["a" /* default */](ctx, x + 3 * 40, y, 'Decay', initialDecay, 10, value => {
    state.instruments.snare.setProp({ property: 'decay', value });
  });
  modules.push(decay);
  moduleMap['3/0'] = decay;
  moduleMap['4/0'] = decay;
  moduleMap['5/0'] = decay;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = snareControlFunction;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__instruments_kick__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__instruments_leadSynth__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instruments_synth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instruments_fm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__instruments_snare__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__instruments_hat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(5);








function makeStepArray(steps) {
  let empty = [];
  empty.length = steps;
  empty.fill(undefined);
  let arr = empty.map(item => ({ step: 0, note: 0, hold: false }));
  return arr;
}

class State {
  constructor(audioCtx) {
    this.swingIsOn = false;
    this.isPlaying = false;
    this.tempo = 120;
    this.viewPage = 0;
    this.playPage = 0;
    this.sequenceIndex = 0;
    this.sequence = [0, 0, 0, 0];
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
      bass: new __WEBPACK_IMPORTED_MODULE_2__instruments_synth__["b" /* default */](audioCtx),
      kick: new __WEBPACK_IMPORTED_MODULE_0__instruments_kick__["b" /* default */](audioCtx),
      snare: new __WEBPACK_IMPORTED_MODULE_4__instruments_snare__["b" /* default */](audioCtx),
      fm: new __WEBPACK_IMPORTED_MODULE_3__instruments_fm__["b" /* default */](audioCtx),
      lead: new __WEBPACK_IMPORTED_MODULE_1__instruments_leadSynth__["b" /* default */](audioCtx),
      hat: new __WEBPACK_IMPORTED_MODULE_5__instruments_hat__["b" /* default */](audioCtx)
    };
  }
  push(child) {
    this.children.push(child);
    return child;
  }
  trigger(message) {
    switch (message.type) {
      case 'get_page':
        return this.steps[message.instrument][this.viewPage];
      case 'toggle_swing':
        return this.swingIsOn = !this.swingIsOn;
      case 'set_page':
        this.viewPage = message.page;
        this.drawScreen();
        return message.page;
      case 'copy_page':
        return this.copyPage();
      case 'paste_page':
        return this.pastePage();
      case 'set_sequence':
        return this.setSequence(message.sequence);
    }
  }
  toggleStep(idx, type, values) {
    this.steps[type][this.viewPage][idx].step = (this.steps[type][this.viewPage][idx].step + 1) % values;
  }
  togglePlay() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.context.resume().then(() => {
        this.noteTime = 0.0;
        this.startTime = this.context.currentTime + 0.005;
        this.rhythmIndex = 0;
        this.previousRhythmIndex = null;
        return this.schedule();
      });
    } else {
      return this.stop();
    }
  }
  setSequence(sequence) {
    this.sequence = sequence;
  }
  copyPage() {
    Object.keys(this.steps).forEach(stepKey => {
      this.copyBuffer.steps[stepKey] = this.steps[stepKey][this.viewPage].slice().map(step => Object.assign({}, step));
    });
  }
  pastePage() {
    Object.keys(this.steps).forEach(stepKey => {
      this.steps[stepKey][this.viewPage] = this.copyBuffer.steps[stepKey].slice();
    });
    this.drawScreen();
  }
  schedule() {
    let currentTime = this.context.currentTime;
    currentTime -= this.startTime;
    const nextTime = currentTime + 0.200;
    while (this.noteTime < nextTime) {
      var contextPlayTime = this.noteTime + this.startTime;
      if (this.viewPage === this.playPage) {
        this.blinkers[this.rhythmIndex].toggle();
      }
      if (this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle(false);
      /* for each instrument pass the step object for this page and beat into the play method */
      Object.keys(this.steps).forEach(type => {
        this.instruments[type].play(this.steps[type][this.playPage][this.rhythmIndex]);
      });
      this.advanceNote();
    }
    this.interval = setTimeout(() => {
      this.schedule();
    }, 0);
  }
  advanceNote() {
    let secondsPerBeat = 60 / this.tempo;
    this.previousRhythmIndex = this.rhythmIndex;
    this.rhythmIndex++;
    if (this.rhythmIndex === __WEBPACK_IMPORTED_MODULE_6__constants__["b" /* LOOP_LENGTH */]) {
      this.rhythmIndex = 0;
      this.sequenceIndex = (this.sequenceIndex + 1) % __WEBPACK_IMPORTED_MODULE_6__constants__["c" /* SEQUENCE_LENGTH */];
      this.playPage = this.sequence[this.sequenceIndex];
      this.drawScreen();
    }
    if (this.swingIsOn) {
      this.noteTime += this.rhythmIndex % 2 ? 0.32 * secondsPerBeat : 0.18 * secondsPerBeat;
    } else {
      this.noteTime += 0.25 * secondsPerBeat;
    }
  }
  stop() {
    Object.keys(this.instruments).forEach(key => {
      this.instruments[key].stopAll();
    });
    this.blinkers[this.previousRhythmIndex].toggle();
    window.clearInterval(this.interval);
    this.context.suspend();
  }
  drawScreen() {
    this.children.forEach(child => child.render());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BeatMarker {
  constructor(ctx, x, y) {
    this.context = ctx;
    this.x = x;
    this.y = y;
  }
  render() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, 40, 40);
    this.context.clearRect(this.x, this.y, 30, 30);
  }
  handleClick() {}
}
/* unused harmony export default */


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Button {
  constructor(text, ctx, x, y, handleClick) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.textWidth = Math.ceil(ctx.measureText(text).width);
    this.width = Math.ceil((this.textWidth + 10) / 40) * 40;
    this.toggled = false;
    this.context = ctx;
    this.callBack = handleClick;
  }
  handleClick(x, y) {
    this.toggled = !this.toggled;
    this.callBack(this.toggled);
    this.render();
  }
  render() {
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
    const wordMargin = this.width / 2 - this.textWidth / 2;
    this.context.fillText(this.text, this.x + wordMargin, this.y + 25, this.width + 3);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__instruments_synth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__switch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Blinker__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__note__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__instruments_instrumentControlFunctions__ = __webpack_require__(20);






class InstrumentWindow {
  constructor(state, ctx, x, y) {
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
  push(child) {
    this.children.push(child);
    return child;
  }
  build() {
    for (var i = 0; i < 16; i++) {
      this.moduleMap[`${i}/9`] = this.push(new __WEBPACK_IMPORTED_MODULE_3__note__["a" /* default */](i, this, this.context, this.x + i * 40, this.y + 9 * 40));
      this.moduleMap[`${i}/10`] = this.push(new __WEBPACK_IMPORTED_MODULE_1__switch__["a" /* OctaveSwitch */](i, this, this.context, this.x + i * 40, this.y + 10 * 40));
      this.moduleMap[`${i}/11`] = this.push(new __WEBPACK_IMPORTED_MODULE_2__Blinker__["a" /* default */](i, this.parent, this.context, this.x + i * 40, this.y + 11 * 40));
    }
    this.buildInstrumentControls();
  }
  buildInstrumentControls() {
    __WEBPACK_IMPORTED_MODULE_4__instruments_instrumentControlFunctions__["a" /* default */][this.instrument](this.parent, this.instrumentControls, this.instrumentControlMap, this.context, this.x, this.y);
  }
  trigger(message) {
    return this.parent.trigger(message);
  }
  setInstrument(instrument) {
    this.instrument = instrument;
    this.instrumentControls = [];
    this.instrumentControlMap = {};
    this.build();
    this.parent.drawScreen();
  }
  getPage() {
    return this.trigger({ type: 'get_page', instrument: this.instrument });
  }
  renderChildren() {
    this.children.forEach(child => child.render());
    this.instrumentControls.forEach(child => child.render());
  }
  render() {
    this.context.fillRect(this.x, this.y, 640, 480);
    this.context.clearRect(this.x + 1, this.y + 1, 638, 478);
    this.renderChildren();
  }
  handleClick(x, y, innerX, innerY) {
    let xCell = x - this.x / 40;
    let yCell = y - this.y / 40;
    let key = `${xCell}/${yCell}`;
    let module = this.moduleMap[key] || this.instrumentControlMap[key];
    if (module) module.handleClick(x, y, innerX, innerY);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InstrumentWindow;


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

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PageButton {
  constructor(state, ctx, x, y, handleClick) {
    this.context = ctx;
    this.state = state;
    this.pageOne = x / 40;
    this.x = x;
    this.y = y;
    this.value = 0;
    this.callBack = handleClick;
  }
  handleClick(x, y) {
    const buttonIdx = x - this.pageOne;
    this.value = buttonIdx;
    this.state.trigger({ type: 'set_page', page: this.value });
    this.render();
  }
  render() {
    this.value = this.state.viewPage; // reset page btn to top level page value
    this.context.fillStyle = 'black';
    for (let i = 0; i < 4; i++) {
      const offset = 40 * i;
      const name = `Pg ${i + 1}`;
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageButton;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PlayBtn {
  constructor(ctx, state, x, y) {
    this.context = ctx;
    this.state = state;
    this.x = x;
    this.y = y;
    this.on = state.isPlaying;
  }
  render() {
    this.on = this.state.isPlaying;
    this.context.fillStyle = this.on ? 'red' : 'green';
    this.context.fillRect(this.x, this.y, 40, 40);
    this.context.fillStyle = this.on ? 'black' : 'white';
    this.context.fillText(this.on ? 'STOP' : 'PLAY', this.x + 1, this.y + 25, 80);
  }
  handleClick() {
    this.state.togglePlay();
    this.on = this.state.isPlaying;
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayBtn;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SequenceList {
  constructor(state, ctx, x, y, handleClick) {
    this.context = ctx;
    this.state = state;
    this.pageOne = x / 40;
    this.x = x;
    this.y = y;
    this.value = [0, 0, 0, 0];
    this.callBack = handleClick;
  }
  handleClick(x, y) {
    const buttonIdx = x - this.pageOne;
    this.value[buttonIdx] = (this.value[buttonIdx] + 1) % 4;
    this.state.trigger({ type: 'set_sequence', sequence: this.value });
    this.render();
  }
  render() {
    this.context.clearRect(this.x, this.y, 40, 160);
    this.context.fillStyle = 'black';
    for (let i = 0; i < 4; i++) {
      const offset = 40 * i;
      const name = `${this.value[i] + 1}`;
      this.context.fillRect(this.x + offset, this.y, 40, 40);
      this.context.clearRect(this.x + offset + 1, this.y, 39 - (i === 3 ? 1 : 0), 39);
      if (this.state.sequenceIndex === i) {
        this.context.beginPath();
        this.context.arc(this.x + 40 * i + 6, this.y + 6, 4, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'blue';
        this.context.fill();
      }
      this.context.fillStyle = 'black';
      this.context.fillText(name, this.x + offset + 17, this.y + 25, 80);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SequenceList;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PlayBtn {
  constructor(state, ctx, x, y) {
    this.context = ctx;
    this.state = state;
    this.x = x;
    this.y = y;
  }
  render() {
    const tempoText = `${this.state.tempo}/bpms`;
    this.context.fillStyle = 'black';
    this.context.clearRect(this.x, this.y, 65, 40);
    this.context.fillText('+', this.x + 25, this.y + 10, 80);
    this.context.fillText('-', this.x + 26, this.y + 40, 80);
    this.context.fillText(tempoText, this.x, this.y + 25, 80);
  }
  handleClick(x, y, innerX, innerY) {
    const section = Math.floor(innerY / 20);
    this.state.tempo = section ? this.state.tempo - 1 : this.state.tempo + 1;
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayBtn;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Word {
  constructor(word, ctx, x, y, handleClick) {
    this.context = ctx;
    this.word = word;
    this.x = x;
    this.y = y;
    this.handleClick = handleClick || function () {};
  }
  render() {
    this.context.clearRect(this.x, this.y, 40, 40);
    this.context.fillStyle = 'green';
    this.context.fillText(this.word, this.x + 3, this.y + 25, 80);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Word;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__synth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leadSynth__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__kick__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__snare__ = __webpack_require__(10);







const map = {
  'bass': __WEBPACK_IMPORTED_MODULE_0__synth__["a" /* bassControlFunction */],
  'lead': __WEBPACK_IMPORTED_MODULE_1__leadSynth__["a" /* leadControlFunction */],
  'fm': __WEBPACK_IMPORTED_MODULE_2__fm__["a" /* fmControlFunction */],
  'kick': __WEBPACK_IMPORTED_MODULE_3__kick__["a" /* kickControlFunction */],
  'hat': __WEBPACK_IMPORTED_MODULE_4__hat__["a" /* hatControlFunction */],
  'snare': __WEBPACK_IMPORTED_MODULE_5__snare__["a" /* snareControlFunction */]
};

/* harmony default export */ __webpack_exports__["a"] = (map);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_PlayBtn__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_BeatMarker__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_Word__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_Options__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_PageButton__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_Tempo__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_Button__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_InstrumentWindow__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ui_SequenceList__ = __webpack_require__(17);











const canvas = document.getElementById('synth');
const ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif';
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const state = new __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */](audioCtx);

/* Play button */
const playBtn = state.push(new __WEBPACK_IMPORTED_MODULE_1__ui_PlayBtn__["a" /* default */](ctx, state, 0, 0));
state.blocks['0/0'] = playBtn;

/* Page controls */
const pageButton = state.push(new __WEBPACK_IMPORTED_MODULE_5__ui_PageButton__["a" /* default */](state, ctx, 2 * 40, 0));
state.blocks['2/0'] = pageButton;
state.blocks['3/0'] = pageButton;
state.blocks['4/0'] = pageButton;
state.blocks['5/0'] = pageButton;

const sequenceControl = state.push(new __WEBPACK_IMPORTED_MODULE_9__ui_SequenceList__["a" /* default */](state, ctx, 2 * 40, 40));
state.blocks['2/1'] = sequenceControl;
state.blocks['3/1'] = sequenceControl;
state.blocks['4/1'] = sequenceControl;
state.blocks['5/1'] = sequenceControl;

state.blocks['7/0'] = state.push(new __WEBPACK_IMPORTED_MODULE_3__ui_Word__["a" /* default */]('Copy', ctx, 7 * 40, 0, () => state.trigger({ type: 'copy_page' })));
state.blocks['8/0'] = state.push(new __WEBPACK_IMPORTED_MODULE_3__ui_Word__["a" /* default */]('Paste', ctx, 8 * 40, 0, () => state.trigger({ type: 'paste_page' })));
/* Tempo */
const tempo = state.push(new __WEBPACK_IMPORTED_MODULE_6__ui_Tempo__["a" /* default */](state, ctx, 11 * 40, 0));
state.blocks['11/0'] = tempo;
state.blocks['12/0'] = tempo;

const toggleSwing = () => state.trigger({ type: 'toggle_swing' });
const swingToggle = state.push(new __WEBPACK_IMPORTED_MODULE_4__ui_Options__["a" /* default */]({ options: ['straight', 'swing'], cb: toggleSwing, ctx, x: 14 * 40, y: 0 }));
state.blocks['14/0'] = swingToggle;
state.blocks['15/0'] = swingToggle;

const instrumentWindow = state.push(new __WEBPACK_IMPORTED_MODULE_8__ui_InstrumentWindow__["a" /* default */](state, ctx, 4 * 40, 3 * 40));
for (let i = 4; i < 20; i++) {
  for (let k = 3; k < 16; k++) {
    state.blocks[`${i}/${k}`] = instrumentWindow;
  }
}

const instruments = ['fm', 'bass', 'lead', 'kick', 'snare', 'hat'];
let startX = 4 * 40;

for (let i = 0; i < instruments.length; i++) {
  let btn = new __WEBPACK_IMPORTED_MODULE_7__ui_Button__["a" /* default */](instruments[i], ctx, startX, 80, on => {
    instrumentWindow.setInstrument(instruments[i]);
  });
  btn.isToggled = () => instrumentWindow.instrument === instruments[i];
  state.push(btn);
  for (let k = 0; k <= Math.floor(btn.width / 40); k++) {
    state.blocks[`${Math.ceil(startX / 40) + k}/2`] = btn;
  }
  startX = startX + btn.width;
}

canvas.onclick = function (e) {
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let canvasX = 0;
  let canvasY = 0;
  let currentElement = this;
  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
  } while (currentElement = currentElement.offsetParent);
  canvasX = e.pageX - totalOffsetX - window.scrollX;
  canvasY = e.pageY - totalOffsetY - window.scrollY;

  let x = Math.floor(canvasX / 40);
  let y = Math.floor(canvasY / 40);
  let innerX = canvasX - x * 40;
  let innerY = canvasY - y * 40;
  const key = `${x}/${y}`;
  const module = state.blocks[key];
  if (module) {
    state.blocks[key].handleClick(x, y, innerX, innerY);
  }
};

const pageKeys = ['Digit1', 'Digit2', 'Digit3', 'Digit4'];

window.onkeydown = function (e) {
  if (e.code) {
    if (e.code === 'Space') {
      state.togglePlay();
      playBtn.render();
    } else if (pageKeys.indexOf(e.code) !== -1) {
      const page = parseInt(e.code.split('Digit')[1]) - 1;
      state.trigger({ type: 'set_page', page });
    } else if (e.code === 'BracketLeft' || e.code === 'BracketRight') {
      let instrumentIdx = instruments.indexOf(instrumentWindow.instrument);
      if (e.code === 'BracketLeft' && instrumentIdx > 0) instrumentIdx -= 1;
      if (e.code === 'BracketRight' && instrumentIdx < instruments.length - 1) instrumentIdx += 1;
      instrumentWindow.setInstrument(instruments[instrumentIdx]);
    } else if (e.code === 'KeyC') {
      state.trigger({ type: 'copy_page' });
    } else if (e.code === 'KeyV') {
      state.trigger({ type: 'paste_page' });
    }
  }
};

state.drawScreen();

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Blinker {
  constructor(i, state, ctx, x, y) {
    this.context = ctx;
    state.blinkers[i] = this;
    this.idx = i;
    this.on = false;
    this.x = x;
    this.y = y;
  }
  render() {
    if (this.on || this.idx % 4 === 0) {
      this.drawCircle();
    } else {
      this.context.clearRect(this.x - 1, this.y - 1, 39, 39);
    }
  }
  drawCircle() {
    this.context.beginPath();
    this.context.arc(this.x + 20, this.y + 20, 8, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.idx % 4 ? 'red' : 'blue';
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#003300';
    this.context.stroke();
  }
  handleClick() {}
  toggle(value) {
    this.on = value !== undefined ? value : !this.on;
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Blinker;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ValueInput {
  constructor({ ctx, x, y, initialValue, maxValue, cb }) {
    this.context = ctx;
    this.value = initialValue;
    this.maxValue = maxValue;
    this.x = x;
    this.y = y;
    this.callback = cb;
  }
  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 40, 40);
    this.context.clearRect(this.x + 1, this.y + 1, 38, 38);
    this.context.fillText('+', this.x + 20, this.y + 13, 40);
    this.context.fillText('-', this.x + 21, this.y + 37, 40);
    this.context.fillText(this.value, this.x + 5, this.y + 25, 40);
  }
  handleClick(x, y, innerX, innerY) {
    const section = Math.floor(innerY / 20);
    this.value = Math.abs((section ? this.value - 1 : this.value + 1) % this.maxValue);
    this.callback(this.value);
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValueInput;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Note {
  constructor(idx, parent, context, x, y) {
    this.notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'], this.parent = parent;
    this.context = context;
    this.idx = idx;
    this.x = x;
    this.y = y;
  }
  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, 40, 40);
    this.context.clearRect(this.x + 1, this.y + 1, 38, 38);
    const page = this.parent.getPage();
    const noteIndex = page[this.idx].note;
    this.context.fillText(this.notes[noteIndex], this.x + 15, this.y + 25, 15);
  }
  handleClick() {
    const page = this.parent.getPage();
    page[this.idx].note = page[this.idx].note === 11 ? 0 : page[this.idx].note + 1;
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Note;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5);


class BinSwitch {
  constructor(idx, state, ctx) {
    this.idx = idx;
    this.state = state;
    this.context = ctx;
    this.x = null;
    this.y = null;
    this.colors = ['black', 'red'];
  }
  render() {
    const page = this.state.getPage();
    this.context.fillStyle = this.colors[page[this.idx].step];
    this.context.fillRect(this.x, this.y, 39, 39);
    this.context.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* COLOR */];
  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
  handleClick() {
    const page = this.state.getPage();
    this.value = (this.value + 1) % 2;
    page[this.idx].step = this.value;
    this.context.clearRect(this.x, this.y, 39, 39);
    this.context.fillStyle = this.colors[page[this.idx].step];
    this.context.fillRect(this.x, this.y, 39, 39);
    this.context.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* COLOR */];
  }
}
/* unused harmony export BinSwitch */


class OctaveSwitch {
  constructor(idx, state, ctx, x, y) {
    this.idx = idx;
    this.state = state;
    this.context = ctx;
    this.x = x;
    this.y = y;
    this.colors = ['black', 'red', 'blue'];
  }
  render() {
    const page = this.state.getPage();
    this.context.fillStyle = this.colors[page[this.idx].step];
    this.context.fillRect(this.x, this.y, 39, 39);
    this.context.fillStyle = page[this.idx].hold ? 'green' : 'yellow';
    this.context.fillRect(this.x, this.y, 10, 10);
    this.context.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* COLOR */];
  }
  handleClick(x, y, innerX, innerY) {
    const isHold = innerX <= 10 && innerY <= 10;
    const page = this.state.getPage();
    if (isHold) {
      page[this.idx].hold = !page[this.idx].hold;
    } else {
      this.value = (page[this.idx].step + 1) % 3;
      page[this.idx].step = this.value;
    }
    this.context.clearRect(this.x, this.y, 39, 39);
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OctaveSwitch;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map