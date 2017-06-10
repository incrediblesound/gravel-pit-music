import State from './state'
import { BinSwitch, OctaveSwitch } from './switch'
import Note from './note'
import {
  Background,
  PlayBtn,
  BeatMarker,
  Blinker,
  Word,
  Options
 } from './classes'

const canvas = document.getElementById('synth');
const ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif'
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const blocks = {}
const state = new State(audioCtx)

const moduleMap = {}

for(var i = 0; i < 16; i++){
  moduleMap[`${i+2}/12`] = new OctaveSwitch(i,'hat', state, ctx)
  moduleMap[`${i+2}/13`] = new BinSwitch(i,'snare', state, ctx)
  moduleMap[`${i+2}/14`] = new Note(i,'kick', state, ctx)
  moduleMap[`${i+2}/15`] = new BinSwitch(i,'kick', state, ctx)

  moduleMap[`${i+2}/7`] = new Note(i,'leadSynth', state, ctx)
  moduleMap[`${i+2}/8`] = new OctaveSwitch(i,'leadSynth', state, ctx)
  moduleMap[`${i+2}/9`] = new Note(i,'key', state, ctx)
  moduleMap[`${i+2}/10`] = new OctaveSwitch(i,'key', state, ctx)

  moduleMap[`${i+2}/2`] = new Blinker(i, state, ctx)
}
/* Play button */
blocks['0/0'] = new PlayBtn(ctx, state, 0, 0)
/* 4 Beat markers */
blocks['2/16'] = new BeatMarker(ctx, 2*40, 16*40)
blocks['6/16'] = new BeatMarker(ctx, 6*40, 16*40)
blocks['10/16'] = new BeatMarker(ctx, 10*40, 16*40)
blocks['14/16'] = new BeatMarker(ctx, 14*40, 16*40)
/* Instrument names */
blocks['0/8'] = new Word('Lead', ctx, 0, 8*40)
blocks['0/9'] = new Word('Bass', ctx, 0, 10*40)
blocks['0/15'] = new Word('Kick', ctx, 0, 15*40)
blocks['0/13'] = new Word('Snare', ctx, 0, 13*40)
blocks['0/12'] = new Word('Hat', ctx, 0, 12*40)

const updateKickDecay = state.instruments.kick.setDecay.bind(state.instruments.kick)
blocks['18/15'] = new Word('Decay', ctx, 18*40, 15*40)
blocks['19/15'] = new Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateKickDecay, ctx, 19*40+10, 15*40)

const updateLeadDecay = state.instruments.leadSynth.setDecay.bind(state.instruments.leadSynth)
blocks['18/8'] = new Word('Decay', ctx, 18*40, 8*40)
blocks['19/8'] = new Options([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], updateLeadDecay, ctx, 19*40+10, 8*40)

const updateLeadWave = state.instruments.leadSynth.setWave.bind(state.instruments.leadSynth)
blocks['21/8'] = new Word('Wave', ctx, 21*40, 8*40)
blocks['22/8'] = new Options(['sine','square', 'sawtooth'], updateLeadWave, ctx, 22*40+5, 8*40)

for(var i = 0; i < 1020; i += 40){
  for(var k = 0; k < 680; k += 40){
    const key = `${i/40}/${k/40}`
    const module = moduleMap[key]
    if(module){
      module.setPos(i, k)
      blocks[key] = module
    }
    if(blocks[key]) blocks[key].render()
  }
}
canvas.onclick = (e) => {
  let x = Math.floor(e.clientX/40)
  let y = Math.floor(e.clientY/40)
  const key = `${x}/${y}`
  const module = blocks[key]
  if(module){
    blocks[key].handleClick()
  }
}
