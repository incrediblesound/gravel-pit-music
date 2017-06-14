export default class LeadSynth {
  constructor(ctx){
    this.context = ctx
    this.previousTone = 0
    this.previousOct = 1
    this.decay = 0
    this.prevOsc = null
    this.playing = false
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
  osc.type = this.config.type

  const gainNode = this.context.createGain()
  gainNode.gain.value = 0

  const filter = this.context.createBiquadFilter();
  filter.type = 'lowpass'
  filter.frequency.value = 0

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
      gainNode.gain.setTargetAtTime(0.4, this.context.currentTime, 0.001);
      filter.frequency.setTargetAtTime(1000, this.context.currentTime, 0.03)
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
