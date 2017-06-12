import State from './state'
import { BinSwitch, OctaveSwitch } from './switch'
import Note from './note'
import {
  Background,
  PlayBtn,
  BeatMarker,
  Blinker,
  Word,
  Options,
  PageButton
 } from './classes'

const canvas = document.getElementById('synth');
const ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif'
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const state = new State(audioCtx)

for(var i = 0; i < 16; i++){
  state.moduleMap[`${i+2}/12`] = new OctaveSwitch(i,'hat', state, ctx)
  state.moduleMap[`${i+2}/13`] = new BinSwitch(i,'snare', state, ctx)
  state.moduleMap[`${i+2}/14`] = new Note(i,'kick', state, ctx)
  state.moduleMap[`${i+2}/15`] = new BinSwitch(i,'kick', state, ctx)

  state.moduleMap[`${i+2}/5`] = new Note(i,'fmSynth', state, ctx)
  state.moduleMap[`${i+2}/6`] = new OctaveSwitch(i,'fmSynth', state, ctx)
  state.moduleMap[`${i+2}/7`] = new Note(i,'leadSynth', state, ctx)
  state.moduleMap[`${i+2}/8`] = new OctaveSwitch(i,'leadSynth', state, ctx)
  state.moduleMap[`${i+2}/9`] = new Note(i,'key', state, ctx)
  state.moduleMap[`${i+2}/10`] = new OctaveSwitch(i,'key', state, ctx)

  state.moduleMap[`${i+2}/2`] = new Blinker(i, state, ctx)
}
/* Play button */
state.blocks['0/0'] = new PlayBtn(ctx, state, 0, 0)
/* 4 Beat markers */
state.blocks['2/16'] = new BeatMarker(ctx, 2*40, 16*40)
state.blocks['6/16'] = new BeatMarker(ctx, 6*40, 16*40)
state.blocks['10/16'] = new BeatMarker(ctx, 10*40, 16*40)
state.blocks['14/16'] = new BeatMarker(ctx, 14*40, 16*40)
/* Instrument names */
state.blocks['0/6'] = new Word('FM', ctx, 0, 6*40)
state.blocks['0/8'] = new Word('Lead', ctx, 0, 8*40)
state.blocks['0/9'] = new Word('Bass', ctx, 0, 10*40)
state.blocks['0/15'] = new Word('Kick', ctx, 0, 15*40)
state.blocks['0/13'] = new Word('Snare', ctx, 0, 13*40)
state.blocks['0/12'] = new Word('Hat', ctx, 0, 12*40)

const updateKickDecay = state.instruments.kick.setDecay.bind(state.instruments.kick)
state.blocks['18/15'] = new Word('Decay', ctx, 18*40, 15*40)
state.blocks['19/15'] = new Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateKickDecay, ctx, 19*40+10, 15*40)

const updateLeadDecay = state.instruments.leadSynth.setDecay.bind(state.instruments.leadSynth)
state.blocks['18/8'] = new Word('Decay', ctx, 18*40, 8*40)
state.blocks['19/8'] = new Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateLeadDecay, ctx, 19*40+10, 8*40)

const updateBassFilter = state.instruments.key.setFilter.bind(state.instruments.key)
state.blocks['18/10'] = new Word('Filter', ctx, 18*40, 10*40)
state.blocks['19/10'] = new Options([0, 1, 2, 3, 4, 5, 6], updateBassFilter, ctx, 19*40+10, 10*40)

const updateLeadWave = state.instruments.leadSynth.setWave.bind(state.instruments.leadSynth)
state.blocks['21/8'] = new Word('Wave', ctx, 21*40, 8*40)
state.blocks['22/8'] = new Options(['sine','square', 'sawtooth'], updateLeadWave, ctx, 22*40+5, 8*40)


const pageButton = new PageButton(state, ctx, 2*40, 0)
state.blocks['2/0'] = pageButton
state.blocks['3/0'] = pageButton
state.blocks['4/0'] = pageButton
state.blocks['5/0'] = pageButton

state.blocks['7/0'] = new Word('Copy', ctx, 7*40, 0, state.copyPage.bind(state))
state.blocks['8/0'] = new Word('Paste', ctx, 8*40, 0, state.pastePage.bind(state))

canvas.onclick = function (e) {
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let canvasX = 0;
  let canvasY = 0;
  let currentElement = this;
  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop
  } while(currentElement = currentElement.offsetParent)
  canvasX = e.pageX - totalOffsetX - window.scrollX;
  canvasY = e.pageY - totalOffsetY - window.scrollY;

  let x = Math.floor(canvasX/40)
  let y = Math.floor(canvasY/40)
  const key = `${x}/${y}`
  const module = state.blocks[key]
  if(module){
    state.blocks[key].handleClick(x, y)
  }
}

window.onkeydown = function(e){
  if(e.code && e.code === 'Space'){
    state.togglePlay()
  }
}

state.initScreen()
