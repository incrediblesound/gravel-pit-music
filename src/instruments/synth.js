import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'
import ControlOptions from '../ui/InstrumentControlOptions'

export default class KeySynth extends Listener {
  constructor(ctx){
    super()
    this.name = 'bass'
    this.volume = 8
    this.context = ctx
    this.oscillators = {}
    this.filterValue = 1
    this.waveform = 'sawtooth'
    this.playing = false
  }
  stopAll(){
    if(!this.oscillators.osc1) return
    this.oscillators.gain[0].gain.setTargetAtTime(0, this.context.currentTime+0.05, 0.1)
    this.oscillators.gain[1].gain.setTargetAtTime(0, this.context.currentTime+0.05, 0.1)
    this.oscillators.gain[2].gain.setTargetAtTime(0, this.context.currentTime+0.05, 0.1)
    this.oscillators.osc1.stop(this.context.currentTime+1)
    this.oscillators.osc2.stop(this.context.currentTime+1)
    this.oscillators.osc3.stop(this.context.currentTime+1)
    this.oscillators = {}
    this.playing = false
  }
  makeOscillator(waveform){
    const osc = this.context.createOscillator()
    osc.type = waveform
    return osc
  }
  getOscillators(note, oct){
    const osc1 = this.makeOscillator('triangle')
    const osc2 = this.makeOscillator(this.waveform)
    const osc3 = this.makeOscillator(this.waveform)
    const gain = [
      this.context.createGain(), this.context.createGain(), this.context.createGain()
    ]
    const filters = [
      this.context.createBiquadFilter(), this.context.createBiquadFilter()
    ]
    filters[0].frequency.value = this.filterValue * 500
    filters[1].frequency.value = this.filterValue * 500

    osc1.connect(gain[0])
    osc2.connect(filters[0])
    osc3.connect(filters[1])
    filters[0].connect(gain[1])
    filters[1].connect(gain[2])
    gain.forEach(g => {
      g.gain.value = (this.volume * 0.1) - (this.filterValue * 0.05)
      g.connect(this.context.destination)
    })

    return [ osc1, osc2, osc3, gain, filters ]
  }
  play({ step, note, hold }){
    if(step && !hold){
      this.stopAll()
      let [ osc1, osc2, osc3, gain, filters ] = this.getOscillators(note, step)
      this.oscillators = {
        osc1, osc2, osc3,
        gain, filters
      }
      filters[0].frequency.setTargetAtTime(0, this.context.currentTime+0.02, 0.2)
      filters[1].frequency.setTargetAtTime(0, this.context.currentTime+0.02, 0.2)
      osc1.start()
      osc2.start()
      osc3.start()
      this.playing = true
    }
    if((step && this.playing) || (hold && step && this.playing && this.oscillators.osc1)){
      this.oscillators.osc1.frequency.value = 55 * step
      this.oscillators.osc2.frequency.value = 55 * step
      this.oscillators.osc3.frequency.value = 110 * step
      this.oscillators.osc1.detune.value = 99  * note
      this.oscillators.osc2.detune.value = 101 * note
      this.oscillators.osc3.detune.value = 100 * note
    }
    if(!step){
      this.stopAll()
    }
  }
}

export const bassControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.bass.volume
  const volume = new ControlValue(ctx, x, y, 'Volume', initialVolume, 10, (value) => {
      state.instruments.bass.setProp({ property: 'volume', value })
  })
  modules.push(volume)
  moduleMap['0/0'] = volume
  moduleMap['1/0'] = volume
  moduleMap['2/0'] = volume

  const initialFilter = state.instruments.bass.filterValue
  const filter = new ControlValue(ctx, x+3*40, y, 'Filter', initialFilter, 20, (value) => {
      state.instruments.bass.setProp({ property: 'filterValue', value })
  })
  modules.push(filter)
  moduleMap['3/0'] = filter
  moduleMap['4/0'] = filter
  moduleMap['5/0'] = filter

  const waveform = new ControlOptions(ctx, x+7*40, y, 'Waveform', ['triangle', 'square','sawtooth'],
  state.instruments.bass.waveform,
  (value) => {
    state.instruments.bass.setProp({ property: 'waveform', value })
  })
  modules.push(waveform)
  moduleMap['7/0'] = waveform
  moduleMap['8/0'] = waveform
  moduleMap['9/0'] = waveform
  moduleMap['10/0'] = waveform

}
