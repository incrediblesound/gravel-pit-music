export default class KickSynth {
  constructor(ctx){
    this.context = ctx
    this.decay = 0
    this.config = {
      type: 'sine'
    }
  }
  newOsc(){
    return
  }
  setDecay(value){
    this.decay = value
  }
  getOscillators(tone){
    const osc = this.context.createOscillator()
    const blipOsc = this.context.createOscillator()
    const gain = this.context.createGain()
    const blipGain = this.context.createGain()
    osc.frequency.value = 55
    blipOsc.frequency.value = 440
    osc.detune.value = tone * 100
    osc.connect(gain)
    blipOsc.connect(blipGain)
    gain.connect(this.context.destination)
    blipGain.connect(this.context.destination)
    return [ osc, gain, blipOsc, blipGain ]
  }
  play(tone){
    const [ osc, gain, blipOsc, blipGain ] = this.getOscillators(tone)
    osc.start()
    blipOsc.start()
    gain.gain.setTargetAtTime(0, this.context.currentTime, 0.07 + (this.decay * 0.01));
    blipGain.gain.setTargetAtTime(0, this.context.currentTime, 0.10);
    blipOsc.frequency.setTargetAtTime(55, this.context.currentTime, 0.05)
    osc.stop(this.context.currentTime+1)
    blipOsc.stop(this.context.currentTime+1)
  }
}
