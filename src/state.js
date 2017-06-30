import KickSynth from './instruments/kick'
import LeadSynth from './instruments/leadSynth'
import fm from './instruments/fm'
import Snare from './instruments/snare'
import Hat from './instruments/hat'
import { LOOP_LENGTH } from './constants'

function makeStepArray(steps){
  let empty = []
  empty.length = steps
  empty.fill(undefined)
  let arr = empty.map(item => ({ step: 0, note: 0, hold: false }))
  return arr
}

export default class State {
  constructor(audioCtx) {
    this.swingIsOn = false
    this.isPlaying = false
    this.tempo = 120
    this.page = 0
    this.blocks = {}
    this.moduleMap = {}
    this.children = []
    this.steps = {
      bass: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      kick: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      snare: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      lead: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      fm: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      hat: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)]
    }
    this.copyBuffer = { notes: {}, steps: {} }
    this.step = 0
    this.context = audioCtx
    this.instruments = {
      bass: new BassSynth(audioCtx),
      kick: new KickSynth(audioCtx),
      snare: new Snare(audioCtx),
      fm: new fm(audioCtx),
      lead: new LeadSynth(audioCtx),
      hat: new Hat(audioCtx)
    }
  }
  push(child){
    this.children.push(child)
    return child
  }
  trigger(message){
    switch (message.type) {
      case 'get_page': return this.steps[message.instrument][this.page]
      case 'toggle_swing': return this.swingIsOn = !this.swingIsOn
      case 'set_page':
        this.page = message.page
        this.drawScreen()
        return message.page
      case 'copy_page': return this.copyPage()
      case 'paste_page': return this.pastePage()
    }
  }
  toggleStep(idx, type, values){
    this.steps[type][this.page][idx].step = (this.steps[type][this.page][idx].step + 1) % values
  }
  togglePlay(){
    this.isPlaying = !this.isPlaying

    if(this.isPlaying){
      this.noteTime = 0.0
      this.startTime = this.context.currentTime + 0.005
      this.rhythmIndex = 0
      this.previousRhythmIndex = null
      this.schedule()
    } else {
      this.stop()
    }
  }
  copyPage(){
    Object.keys(this.steps).forEach(stepKey => {
      this.copyBuffer.steps[stepKey] = this.steps[stepKey][this.page].slice().map(step => Object.assign({}, step))
    })
  }
  pastePage(){
    Object.keys(this.steps).forEach(stepKey => {
      this.steps[stepKey][this.page] = this.copyBuffer.steps[stepKey].slice()
    })
    this.refreshScreen()
  }
  schedule(){
    let currentTime = this.context.currentTime
    currentTime -= this.startTime

    while (this.noteTime < currentTime + 0.200) {
      var contextPlayTime = this.noteTime + this.startTime
      this.blinkers[this.rhythmIndex].toggle()
      if(this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle()
      /* for each instrument pass the step object for this page and beat into the play method */
      Object.keys(this.steps).forEach(type => {
        this.instruments[type].play(this.steps[type][this.page][this.rhythmIndex])
      })
      this.advanceNote()
    }
    this.interval = setTimeout(() => { this.schedule() }, 0)
  }
  advanceNote(){
    let secondsPerBeat = 60 / this.tempo
    this.previousRhythmIndex = this.rhythmIndex
    this.rhythmIndex++;
    if (this.rhythmIndex === LOOP_LENGTH) {
      this.rhythmIndex = 0;
    }

    if(this.swingIsOn){
      this.noteTime += this.rhythmIndex % 2 ? 0.32 * secondsPerBeat : 0.18 * secondsPerBeat
    } else {
      this.noteTime += 0.25 * secondsPerBeat
    }
  }
  stop(){
    Object.keys(this.instruments).forEach(key => {
      this.instruments[key].stopAll()
    })
    this.blinkers[this.previousRhythmIndex].toggle()
    window.clearInterval(this.interval)
  }
  drawScreen(){
    this.children.forEach(child => child.render())
  }
}
