export default class fmSynth {
  constructor(ctx){
    this.context = ctx
    this.decay = 0
    this.prevOsc = null
    this.oscillators = {}
    this.playing = false
    this.config = {
      type: 'square'
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
  storeOscillators(data){
    Object.keys(data).forEach(key => {
      this.oscillators[key] = data[key]
    })
  }
  stopAll(){
    if(!this.oscillators.osc1) return
    this.oscillators.gainNode1.gain.setTargetAtTime(0, this.context.currentTime+(this.decay*0.02), 0.05);
    this.oscillators.gainNode2.gain.setTargetAtTime(0, this.context.currentTime+(this.decay*0.02), 0.05);
    this.oscillators.osc1.stop(this.context.currentTime+1)
    this.oscillators.osc2.stop(this.context.currentTime+1)
    this.oscillators.modulator1.stop(this.context.currentTime+1)
    this.oscillators.modulator2.stop(this.context.currentTime+1)
    this.oscillators = {}
    this.playing = false
  }
  getModulator(oct, wave, gain){
    const modulator = this.context.createOscillator()
    const modulatorGain = this.context.createGain()
    modulator.type = wave
    modulator.frequency.value = oct
    modulatorGain.gain.value = gain
    modulator.connect(modulatorGain)
    return [ modulator, modulatorGain ]
  }
  getOscillator(pan){
    const osc = this.context.createOscillator()
    osc.type = this.config.type

    const gainNode = this.context.createGain()
    gainNode.gain.value = 0.08

    const panNode = this.context.createStereoPanner()
    panNode.pan.value = pan === 'left' ? -0.7 : 0.7

    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 0;

    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(panNode)
    panNode.connect(this.context.destination)
    return [ osc, filter, gainNode ]
  }
  setupOscillators(){
    const [ osc1, filter1, gainNode1 ] = this.getOscillator('left')
    const [ osc2, filter2, gainNode2 ] = this.getOscillator('right')
    const [ modulator1, modulatorGain1 ] = this.getModulator(110, 'sawtooth', 40)
    const [ modulator2, modulatorGain2 ] = this.getModulator(220, 'square', 35)
    modulatorGain1.connect(osc1.frequency)
    modulatorGain2.connect(osc2.frequency)
    return [
      osc1, osc2,
      gainNode1, gainNode2,
      modulator1, modulator2,
      filter1, filter2
     ]
  }
  play({ step, note, hold }){
    if(step && !hold){
      this.stopAll()
      const [
        osc1, osc2,
        gainNode1, gainNode2,
        modulator1, modulator2,
        filter1, filter2
      ] = this.setupOscillators(note, step)
      this.storeOscillators({
        osc1, osc2,
        modulator1, modulator2,
        gainNode1, gainNode2
      })
      modulator1.start()
      modulator2.start()
      osc1.start()
      osc2.start()
      filter1.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03)
      filter2.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03)
      this.playing = true
    }
    if((step && this.playing) || (hold && step && this.playing)){
      this.oscillators.osc1.detune.value = note*102
      this.oscillators.osc1.frequency.value = step*220
      this.oscillators.osc2.detune.value = note*98
      this.oscillators.osc2.frequency.value = step*220
    }
    if(!step && this.oscillators.osc1){
      this.stopAll()
    }
  }
}
