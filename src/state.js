import KeySynth from './instruments/synth'
import KickSynth from './instruments/kick'
import LeadSynth from './instruments/leadSynth'
import Snare from './instruments/snare'
import Hat from './instruments/hat'
import { LOOP_LENGTH } from './constants'

function makeStepArray(){
  let arr = []
  arr.length = 16
  arr.fill(0)
  return arr
}

export default class State {
  constructor(audioCtx) {
    this.steps = {
      key: makeStepArray(),
      kick: makeStepArray(),
      snare: makeStepArray(),
      leadSynth: makeStepArray(),
      hat: makeStepArray()
    }
    this.notes = {
      key: {},
      kick: {},
      leadSynth: {}
    }
    this.blinkers = []
    this.step = 0
    this.context = audioCtx
    this.instruments = {
      key: new KeySynth(audioCtx),
      kick: new KickSynth(audioCtx),
      snare: new Snare(audioCtx),
      leadSynth: new LeadSynth(audioCtx),
      hat: new Hat(audioCtx)
    }
  }
  toggleStep(idx, type, values){
    this.steps[type][idx] = (this.steps[type][idx] + 1) % values
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
  schedule(){
    let currentTime = this.context.currentTime
    // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
    currentTime -= this.startTime

    while (this.noteTime < currentTime + 0.200) {
      var contextPlayTime = this.noteTime + this.startTime
      this.blinkers[this.rhythmIndex].toggle()
      if(this.previousRhythmIndex !== null) this.blinkers[this.previousRhythmIndex].toggle()
      Object.keys(this.steps).forEach(type => {
        if(this.steps[type][this.rhythmIndex]){
          const note = this.notes[type] && this.notes[type][this.rhythmIndex].noteIndex
          this.instruments[type].play(note, this.steps[type][this.rhythmIndex])
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
}
