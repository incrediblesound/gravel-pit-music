import Listener from './Listener'

export default class KickSynth extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.context = ctx
    this.decay = 0
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
    blipGain.gain.value = this.volume * 0.1
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
      gain.gain.setTargetAtTime(0, this.context.currentTime, 0.07 + (this.decay * 0.01));
      blipGain.gain.setTargetAtTime(0, this.context.currentTime, 0.10);
      blipOsc.frequency.setTargetAtTime(55, this.context.currentTime, 0.05)
      osc.stop(this.context.currentTime+1)
      blipOsc.stop(this.context.currentTime+1)
    }
  }
}
