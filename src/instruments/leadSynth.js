import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'
import ControlOptions from '../ui/InstrumentControlOptions'

export default class LeadSynth extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.context = ctx
    this.previousTone = 0
    this.previousOct = 1
    this.decay = 0
    this.filterValue = 1
    this.initialFrequency = 1
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
    filter.frequency.value = this.initialFrequency ? this.initialFrequency * 1000 : 500

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
      filter.frequency.setTargetAtTime(this.filterValue*1000, this.context.currentTime, 0.1)
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

  const waveform = new ControlOptions(ctx, x+3*40, y, 'Waveform', ['triangle', 'sine','sawtooth'],
  state.instruments.lead.waveform,
  (value) => {
    state.instruments.lead.setProp({ property: 'waveform', value })
  })
  modules.push(waveform)
  moduleMap['3/0'] = waveform
  moduleMap['4/0'] = waveform
  moduleMap['5/0'] = waveform
  moduleMap['6/0'] = waveform

  const initialFilter = state.instruments.lead.filterValue
  const filter = new ControlValue(ctx, x+40*3, y+40, 'Filter End', initialFilter, 10, (value) => {
      state.instruments.lead.setProp({ property: 'filterValue', value })
  })
  modules.push(filter)
  moduleMap['3/1'] = filter
  moduleMap['4/1'] = filter
  moduleMap['5/1'] = filter

  const initialFrequencyValue = state.instruments.lead.initialFrequency
  const initialFrequency = new ControlValue(ctx, x, y+40, 'Filter Start', initialFrequencyValue, 10, (value) => {
      state.instruments.lead.setProp({ property: 'initialFrequency', value })
  })
  modules.push(initialFrequency)
  moduleMap['0/1'] = initialFrequency
  moduleMap['1/1'] = initialFrequency
  moduleMap['2/1'] = initialFrequency
}
