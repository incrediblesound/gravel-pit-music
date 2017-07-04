import State from './state'
import PlayBtn from './ui/PlayBtn'
import BeatMarker from './ui/BeatMarker'
import Word from './ui/Word'
import Options from './ui/Options'
import PageButton from './ui/PageButton'
import Tempo from './ui/Tempo'
import Button from './ui/Button'
import InstrumentWindow from './ui/InstrumentWindow'

const canvas = document.getElementById('synth');
const ctx = canvas.getContext('2d');
ctx.font = '14px sans-serif'
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const state = new State(audioCtx)

for(var i = 0; i < 16; i++){
  // state.moduleMap[`${i+2}/12`] = new OctaveSwitch(i,'hat', state, ctx)
  // state.moduleMap[`${i+2}/13`] = new BinSwitch(i,'snare', state, ctx)
  // state.moduleMap[`${i+2}/14`] = new Note(i,'kick', state, ctx)
  // state.moduleMap[`${i+2}/15`] = new BinSwitch(i,'kick', state, ctx)
  //
  // state.moduleMap[`${i+2}/5`] = new Note(i,'fm', state, ctx)
  // state.moduleMap[`${i+2}/6`] = new OctaveSwitch(i,'fm', state, ctx)
  // state.moduleMap[`${i+2}/7`] = new Note(i,'lead', state, ctx)
  // state.moduleMap[`${i+2}/8`] = new OctaveSwitch(i,'lead', state, ctx)
  // state.moduleMap[`${i+2}/9`] = new Note(i,'bass', state, ctx)
  // state.moduleMap[`${i+2}/10`] = new OctaveSwitch(i,'bass', state, ctx)
  // state.blocks[`${i+2}/14`] = state.push(new Blinker(i, state, ctx))
}
/* Play button */
const playBtn = state.push(new PlayBtn(ctx, state, 0, 0))
state.blocks['0/0'] = playBtn


/* Page controls */
const pageButton = state.push(new PageButton(state, ctx, 2*40, 0))
state.blocks['2/0'] = pageButton
state.blocks['3/0'] = pageButton
state.blocks['4/0'] = pageButton
state.blocks['5/0'] = pageButton

state.blocks['7/0'] = state.push(new Word('Copy', ctx, 7*40, 0, () => state.message({ type: 'copy_page'})))
state.blocks['8/0'] = state.push(new Word('Paste', ctx, 8*40, 0, () => state.message({ type: 'paste_page'})))
/* Tempo */
const tempo = state.push(new Tempo(state, ctx, 11*40, 0))
state.blocks['11/0'] = tempo
state.blocks['12/0'] = tempo

const toggleSwing = () => state.trigger({ type: 'toggle_swing' })
const swingToggle = state.push(new Options(['straight', 'swing'], toggleSwing, ctx, 14*40, 0))
state.blocks['14/0'] = swingToggle
state.blocks['15/0'] = swingToggle

const instrumentWindow = state.push(new InstrumentWindow(state, ctx, 4*40, 3*40))
for(let i = 4; i < 20; i++){
  for(let k = 3; k < 16; k++){
    state.blocks[`${i}/${k}`] = instrumentWindow
  }
}

const instruments = ['fm', 'bass','lead', 'kick', 'snare', 'hat']
let startX = 4*40

for(let i = 0; i < instruments.length; i++){
  let btn = new Button(instruments[i], ctx, startX, 80, (on) => {
    instrumentWindow.setInstrument(instruments[i])
  })
  btn.isToggled = () => instrumentWindow.instrument === instruments[i]
  state.push(btn)
  for(let k = 0; k <= Math.floor(btn.width/40); k++){
    state.blocks[`${Math.ceil(startX/40) + k}/2`] = btn
  }
  startX = startX + btn.width
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
  let innerX = canvasX - (x * 40)
  let innerY = canvasY - (y * 40)
  const key = `${x}/${y}`
  const module = state.blocks[key]
  if(module){
    state.blocks[key].handleClick(x, y, innerX, innerY)
  }
}

const pageKeys = ['Digit1', 'Digit2', 'Digit3', 'Digit4']

window.onkeydown = function(e){
  if(e.code && e.code === 'Space'){
    state.togglePlay()
    playBtn.render()
  } else if(e.code && pageKeys.indexOf(e.code) !== -1){
    const page = parseInt(e.code.split('Digit')[1]) - 1
    state.trigger({ type: 'set_page', page })
  }
}

state.drawScreen()
