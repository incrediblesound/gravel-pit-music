import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'

export default class KickSynth extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.context = ctx
    this.decay = 0
    this.attack = 9
    this.config = {
      type: 'sine'
    }
  }
  stopAll(){}
  getOscillators(note){
    const osc = this.context.createOscillator()
    const blipOsc = this.context.createOscillator()
    const gain = this.context.createGain()
    const blipGain = this.context.createGain()
    gain.gain.value = this.volume * 0.1
    blipGain.gain.value = (this.volume - (9 - this.attack)) * 0.1
    osc.frequency.value = 55
    blipOsc.frequency.value = 440
    osc.detune.value = note * 100
    blipOsc.detune.value = note * 100
    osc.connect(gain)
    blipOsc.connect(blipGain)
    gain.connect(this.context.destination)
    blipGain.connect(this.context.destination)
    return [ osc, gain, blipOsc, blipGain ]
  }
  play({ step, note }){
    const [ osc, gain, blipOsc, blipGain ] = this.getOscillators(note)
    if(step){
      osc.start()
      blipOsc.start()
      blipGain.gain.setTargetAtTime(this.volume * 0.1, this.context.currentTime, 0.01*this.attack);
      gain.gain.setTargetAtTime(0, this.context.currentTime, 0.07 + (this.decay * 0.01));
      blipGain.gain.setTargetAtTime(0, this.context.currentTime, 0.10);
      blipOsc.frequency.setTargetAtTime(55, this.context.currentTime, 0.05)
      osc.stop(this.context.currentTime+1)
      blipOsc.stop(this.context.currentTime+1)
    }
  }
}

export const kickControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.kick.volume
  const volume = new ControlValue(ctx, x, y, 'Volume', initialVolume, 10, (value) => {
      state.instruments.kick.setProp({ property: 'volume', value })
  })
  modules.push(volume)
  moduleMap['0/0'] = volume
  moduleMap['1/0'] = volume
  moduleMap['2/0'] = volume

  const initialAttack = state.instruments.kick.attack
  const attack = new ControlValue(ctx, x, y+40, 'Attack', initialAttack, 10, (value) => {
      state.instruments.kick.setProp({ property: 'attack', value })
  })
  modules.push(attack)
  moduleMap['0/1'] = attack
  moduleMap['1/1'] = attack
  moduleMap['2/1'] = attack
}
