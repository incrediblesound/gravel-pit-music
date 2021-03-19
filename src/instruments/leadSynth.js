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
    this.filterValue = 0
    this.initialFrequency = 0
    this.prevOsc = null
    this.playing = false
    this.filterType = 'lowpass'
    this.Q = 0
    this.octave = [1, 1]
    this.waveform = ['sine', 'sine']
  }
  stopAll(){
    if(!this.prevOsc) return
    this.prevGainNode.forEach(g => g.gain.setTargetAtTime(0, this.context.currentTime+0.01+(this.decay*0.02), 0.05));
    this.prevOsc.forEach(osc => osc.stop(this.context.currentTime+1))
    this.prevOsc = null
    this.playing = false
  }
  getOscillators(note, oct, idx){
    this.previousTone = note
    this.previousOct = oct

    const osc = this.context.createOscillator()
    osc.detune.value = this.previousTone * 100
    osc.frequency.value = this.previousOct * (440 * this.octave[idx])
    osc.type = this.waveform[idx]

    const gainNode = this.context.createGain()
    gainNode.gain.value = (this.volume/2)*0.1

    const filter = this.context.createBiquadFilter();
    filter.type = this.filterType
    filter.Q.value = this.Q * 5
    filter.frequency.value = this.initialFrequency ? this.initialFrequency * 1000 : 500

    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.context.destination)

    return [ osc, gainNode, filter ]
  }
  play({ step, note, hold }){
    if(step && !hold){
      this.stopAll()
      const [ osc1, gainNode1, filter1 ] = this.getOscillators(note, step, 0)
      const [ osc2, gainNode2, filter2 ] = this.getOscillators(note, step, 1)
      this.prevOsc = [ osc1, osc2 ]
      this.prevGainNode = [ gainNode1, gainNode2 ]
      osc1.start()
      osc2.start()
      filter1.frequency.setTargetAtTime(this.filterValue*1000, this.context.currentTime, 0.1)
      filter2.frequency.setTargetAtTime(this.filterValue*1000, this.context.currentTime, 0.1)
      this.playing = true
    }
    if((step && this.playing) || (hold && step && this.playing)){
      this.prevOsc.forEach(osc => osc.detune.setTargetAtTime(note*100, this.context.currentTime, 0.03))
      this.prevOsc.forEach(osc => osc.frequency.setTargetAtTime(step*440, this.context.currentTime, 0.03))
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

  const waveform1 = new ControlOptions(ctx, x+4*40, y, 'Waveform 1', ['square', 'sine','sawtooth'],
  state.instruments.lead.waveform[0],
  (value) => {
    state.instruments.lead.setProp({ property: ['waveform', 0], value })
  })
  modules.push(waveform1)
  moduleMap['4/0'] = waveform1
  moduleMap['5/0'] = waveform1
  moduleMap['6/0'] = waveform1
  moduleMap['7/0'] = waveform1

  const waveform2 = new ControlOptions(ctx, x+4*40, y+40, 'Waveform 2', ['square', 'sine','sawtooth'],
  state.instruments.lead.waveform[1],
  (value) => {
    state.instruments.lead.setProp({ property: ['waveform', 1], value })
  })
  modules.push(waveform2)
  moduleMap['4/1'] = waveform2
  moduleMap['5/1'] = waveform2
  moduleMap['6/1'] = waveform2
  moduleMap['7/1'] = waveform2

  const octave1 = new ControlOptions(ctx, x, y+40, 'Octave 1', [0.125, 0.25, 0.5, 1, 2],
  state.instruments.lead.octave[0],
  (value) => {
    state.instruments.lead.setProp({ property: ['octave', 0], value })
  })
  modules.push(octave1)
  moduleMap['0/1'] = octave1
  moduleMap['1/1'] = octave1
  moduleMap['2/1'] = octave1
  moduleMap['3/1'] = octave1

  const octave2 = new ControlOptions(ctx, x, y+80, 'Octave 2', [0.125, 0.25, 0.5, 1, 2],
  state.instruments.lead.octave[1],
  (value) => {
    state.instruments.lead.setProp({ property: ['octave', 1], value })
  })
  modules.push(octave2)
  moduleMap['0/2'] = octave2
  moduleMap['1/2'] = octave2
  moduleMap['2/2'] = octave2
  moduleMap['3/2'] = octave2

  const initialFilter = state.instruments.lead.filterValue
  const filter = new ControlValue(ctx, x+40*10, y, 'Filter End', initialFilter, 10, (value) => {
      state.instruments.lead.setProp({ property: 'filterValue', value })
  })
  modules.push(filter)
  moduleMap['10/0'] = filter
  moduleMap['11/0'] = filter
  moduleMap['12/0'] = filter

  const initialFrequencyValue = state.instruments.lead.initialFrequency
  const initialFrequency = new ControlValue(ctx, x+40*8, y, 'Filter Start', initialFrequencyValue, 10, (value) => {
      state.instruments.lead.setProp({ property: 'initialFrequency', value })
  })
  modules.push(initialFrequency)
  moduleMap['8/0'] = initialFrequency
  moduleMap['9/0'] = initialFrequency
  moduleMap['10/0'] = initialFrequency

  const filterType = new ControlOptions(ctx, x+11*40, y+40, 'Filter Type',
  ['lowpass', 'highpass','bandpass', 'notch'],
  state.instruments.lead.filterType,
  (value) => {
    state.instruments.lead.setProp({ property: 'filterType', value })
  })
  modules.push(filterType)
  moduleMap['11/1'] = filterType
  moduleMap['12/1'] = filterType
  moduleMap['13/1'] = filterType
  moduleMap['14/1'] = filterType

  const initialQ = state.instruments.lead.Q
  const controlQ = new ControlValue(ctx, x+40*8, y+40, 'Filter Q', initialQ, 10, (value) => {
      state.instruments.lead.setProp({ property: 'Q', value: value })
  })
  modules.push(controlQ)
  moduleMap['8/1'] = controlQ
  moduleMap['9/1'] = controlQ
  moduleMap['10/1'] = controlQ
}
