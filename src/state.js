import KeySynth from './instruments/synth'
import KickSynth from './instruments/kick'
import LeadSynth from './instruments/leadSynth'
import fmSynth from './instruments/fm'
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
    this.isPlaying = false
    this.page = 0
    this.blocks = {}
    this.moduleMap = {}
    this.steps = {
      key: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      kick: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      snare: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      leadSynth: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      fmSynth: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      hat: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)]
    }
    this.copyBuffer = { notes: {}, steps: {} }
    this.blinkers = []
    this.step = 0
    this.context = audioCtx
    this.instruments = {
      key: new KeySynth(audioCtx),
      kick: new KickSynth(audioCtx),
      snare: new Snare(audioCtx),
      fmSynth: new fmSynth(audioCtx),
      leadSynth: new LeadSynth(audioCtx),
      hat: new Hat(audioCtx)
    }
  }
  setPage(value){
    this.page = value
    this.refreshScreen()
    return value
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
    // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
    currentTime -= this.startTime

    while (this.noteTime < currentTime + 0.200) {
      var contextPlayTime = this.noteTime + this.startTime
      this.blinkers[this.rhythmIndex].toggle()
      if(this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle()
      Object.keys(this.steps).forEach(type => {
        this.instruments[type].play(this.steps[type][this.page][this.rhythmIndex])
      })
      this.advanceNote()
    }
    this.interval = setTimeout(() => { this.schedule() }, 0)
  }
  advanceNote(){
    // Setting tempo to 60 BPM just for now
    let tempo = 90
    let secondsPerBeat = 60 / tempo
    this.previousRhythmIndex = this.rhythmIndex
    this.rhythmIndex++;
    if (this.rhythmIndex === LOOP_LENGTH) {
      this.rhythmIndex = 0;
    }

    //0.25 because each square is a 16th note
    this.noteTime += 0.25 * secondsPerBeat;
  }
  stop(){
    Object.keys(this.instruments).forEach(key => {
      this.instruments[key].stopAll()
    })
    this.blinkers[this.previousRhythmIndex].toggle()
    window.clearInterval(this.interval)
  }
  initScreen(){
    for(var i = 0; i < 1020; i += 40){
      for(var k = 0; k < 680; k += 40){
        const key = `${i/40}/${k/40}`
        const module = this.moduleMap[key]
        if(module){
          module.setPos(i, k)
          this.blocks[key] = module
        }
        if(this.blocks[key]) this.blocks[key].render()
      }
    }
  }
  refreshScreen(){
    for(var i = 0; i < 1020; i += 40){
      for(var k = 0; k < 680; k += 40){
        const key = `${i/40}/${k/40}`
        if(this.blocks[key]) this.blocks[key].render()
      }
    }
  }
}
