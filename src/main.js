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

/* Play button */
const playBtn = state.push(new PlayBtn(ctx, state, 0, 0))
state.blocks['0/0'] = playBtn


/* Page controls */
const pageButton = state.push(new PageButton(state, ctx, 2*40, 0))
state.blocks['2/0'] = pageButton
state.blocks['3/0'] = pageButton
state.blocks['4/0'] = pageButton
state.blocks['5/0'] = pageButton

state.blocks['7/0'] = state.push(new Word('Copy', ctx, 7*40, 0, () => state.trigger({ type: 'copy_page'})))
state.blocks['8/0'] = state.push(new Word('Paste', ctx, 8*40, 0, () => state.trigger({ type: 'paste_page'})))
/* Tempo */
const tempo = state.push(new Tempo(state, ctx, 11*40, 0))
state.blocks['11/0'] = tempo
state.blocks['12/0'] = tempo

const toggleSwing = () => state.trigger({ type: 'toggle_swing' })
const swingToggle = state.push(new Options({ options: ['straight', 'swing'], cb: toggleSwing, ctx, x: 14*40, y: 0 }))
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
  if(e.code){
    if(e.code === 'Space'){
      state.togglePlay()
      playBtn.render()
    } else if(pageKeys.indexOf(e.code) !== -1){
      const page = parseInt(e.code.split('Digit')[1]) - 1
      state.trigger({ type: 'set_page', page })
    } else if(e.code === 'BracketLeft' || e.code === 'BracketRight'){
      const instrumentIdx = instruments.indexOf(instrumentWindow.instrument)
      let nextInstrumentIdx = e.code === 'BracketLeft' ? instrumentIdx -1 : instrumentIdx + 1
      nextInstrumentIdx = nextInstrumentIdx % instruments.length
      instrumentWindow.setInstrument(instruments[nextInstrumentIdx])
    }
  }
}

state.drawScreen()
