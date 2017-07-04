import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'

export default class LeadSynth extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.context = ctx
    this.previousTone = 0
    this.previousOct = 1
    this.decay = 0
    this.prevOsc = null
    this.playing = false
    this.waveform = 'sine'
  }
  stopAll(){
    if(!this.prevOsc) return
    this.prevGainNode.gain.setTargetAtTime(0, this.context.currentTime+0.1+(this.decay*0.02), 0.05);
    this.prevOsc.stop(this.context.currentTime+1)
    this.prevOsc = null
    this.playing = false
  }
  getOscillators(note, oct){
  this.previousTone = note
  this.previousOct = oct

  const osc = this.context.createOscillator()
  osc.detune.value = this.previousTone * 100
  osc.frequency.value = this.previousOct * 220
  osc.type = this.waveform

  const gainNode = this.context.createGain()
  gainNode.gain.value = 0

  const filter = this.context.createBiquadFilter();
  // filter.type = 'lowpass'
  filter.frequency.value = 2500

  osc.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(this.context.destination)

  return [ osc, gainNode, filter ]
  }
  play({ step, note, hold }){
    if(step && !hold){
      this.stopAll()
      const [ osc, gainNode, filter ] = this.getOscillators(note, step)
      this.prevOsc = osc
      this.prevGainNode = gainNode
      osc.start()
      gainNode.gain.setTargetAtTime(this.volume*0.1, this.context.currentTime+0.01, 0.02);
      filter.frequency.setTargetAtTime(500, this.context.currentTime+0.1, 0.03)
      this.playing = true
    }
    if((step && this.playing) || (hold && step && this.playing)){
      this.prevOsc.detune.setTargetAtTime(note*100, this.context.currentTime, 0.03)
      this.prevOsc.frequency.setTargetAtTime(step*440, this.context.currentTime, 0.03)
    }
    if(!step && this.prevOsc){
      this.stopAll()
    }

  }
}

export const leadControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.lead.volume
  const volume = new ControlValue(ctx, x, y, 'Volume', initialVolume, 10, (value) => {
      state.instruments.lead.setProp({ property: 'volume', value })
  })
  modules.push(volume)
  moduleMap['0/0'] = volume
  moduleMap['1/0'] = volume
  moduleMap['2/0'] = volume
}
