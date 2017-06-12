import KeySynth from './instruments/synth'
import KickSynth from './instruments/kick'
import LeadSynth from './instruments/leadSynth'
import fmSynth from './instruments/fm'
import Snare from './instruments/snare'
import Hat from './instruments/hat'
import { LOOP_LENGTH } from './constants'

function makeStepArray(steps){
  let arr = []
  arr.length = steps
  arr.fill(0)
  return arr
}

export default class State {
  constructor(audioCtx) {
    this.blocks = {}
    this.moduleMap = {}
    this.page = 0
    this.steps = {
      key: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      kick: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      snare: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      leadSynth: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      fmSynth: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      hat: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)]
    }
    this.notes = {
      fmSynth: [makeStepArray(16),makeStepArray(16), makeStepArray(16), makeStepArray(16)],
      key: [makeStepArray(16),makeStepArray(16),makeStepArray(16),makeStepArray(16)],
      kick: [makeStepArray(16),makeStepArray(16),makeStepArray(16),makeStepArray(16)],
      leadSynth: [makeStepArray(16),makeStepArray(16),makeStepArray(16),makeStepArray(16)]
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
    this.steps[type][this.page][idx] = (this.steps[type][this.page][idx] + 1) % values
  }
  togglePlay(play){
    if(play){
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
      this.copyBuffer.steps[stepKey] = this.steps[stepKey][this.page].slice()
    })
    Object.keys(this.notes).forEach(noteKey => {
      this.copyBuffer.notes[noteKey] = this.notes[noteKey][this.page].slice()
    })
  }
  pastePage(){
    Object.keys(this.steps).forEach(stepKey => {
      this.steps[stepKey][this.page] = this.copyBuffer.steps[stepKey].slice()
    })
    Object.keys(this.notes).forEach(noteKey => {
      this.notes[noteKey][this.page] = this.copyBuffer.notes[noteKey].slice()
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
        if(this.steps[type][this.page][this.rhythmIndex]){
          const note = this.notes[type] && this.notes[type][this.page][this.rhythmIndex]
          this.instruments[type].play(note, this.steps[type][this.page][this.rhythmIndex])
        }
      })
      //Insert draw stuff here
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
