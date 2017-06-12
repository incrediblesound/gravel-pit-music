export default class LeadSynth {
  constructor(ctx){
    this.context = ctx
    this.previousTone = 0
    this.previousOct = 1
    this.decay = 0
    this.prevOsc = null
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
  setWave(value){
    this.config.type = value
  }
  getOscillators(tone, oct){
  this.previousTone = tone
  this.previousOct = oct

  const osc = this.context.createOscillator()
  osc.detune.value = this.previousTone * 100
  osc.frequency.value = this.previousOct * 220
  osc.type = this.config.type

  const gainNode = this.context.createGain()
  gainNode.gain.value = 0

  const filter = this.context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 0;

  osc.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(this.context.destination)

  return [ osc, gainNode, filter ]
  }
  play(tone, oct){
    if(this.prevOsc) this.prevOsc.stop()

    const [ osc, gainNode, filter ] = this.getOscillators(tone, oct)
    this.prevOsc = osc

    osc.start()

    osc.detune.setTargetAtTime(tone*100, this.context.currentTime, 0.03)
    osc.frequency.setTargetAtTime(oct*440, this.context.currentTime, 0.03)
    gainNode.gain.setTargetAtTime(0.4, this.context.currentTime, 0.001);
    gainNode.gain.setTargetAtTime(0, this.context.currentTime+0.1+(this.decay*0.02), 0.05);
    filter.frequency.setTargetAtTime(1000, this.context.currentTime, 0.03)
    
    osc.stop(this.context.currentTime+1)
  }
}
