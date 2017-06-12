export default class fmSynth {
  constructor(ctx){
    this.context = ctx
    this.decay = 0
    this.prevOsc = null
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
    const [ modulator1, modulatorGain1 ] = this.getModulator(220, 'sine', 25)
    const [ modulator2, modulatorGain2 ] = this.getModulator(110, 'sawtooth', 20)
    const [ modulator3, modulatorGain3 ] = this.getModulator(55, 'sawtooth', 25)
    const [ modulator4, modulatorGain4 ] = this.getModulator(220, 'square', 30)
    modulatorGain1.connect(modulator2.frequency)
    modulatorGain2.connect(osc1.frequency)
    modulatorGain3.connect(modulator4.frequency)
    modulatorGain4.connect(osc2.frequency)
    return [
      osc1, osc2,
      gainNode1, gainNode2,
      modulator1, modulator2,
      modulator3, modulator4,
      filter1,
      filter2
     ]
  }
  play(tone, oct){
    const [
      osc1, osc2,
      gainNode1, gainNode2,
      modulator1, modulator2,
      modulator3, modulator4,
      filter1,
      filter2
    ] = this.setupOscillators(tone, oct)
    modulator1.start()
    modulator2.start()
    modulator3.start()
    modulator4.start()
    osc1.start()
    osc2.start()

    osc1.detune.value = tone*102
    osc1.frequency.value = oct*220
    filter1.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03)
    gainNode1.gain.setTargetAtTime(0, this.context.currentTime+0.1+(this.decay*0.02), 0.05);

    osc2.detune.value = tone*98
    osc2.frequency.value = oct*220
    filter2.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03)
    gainNode2.gain.setTargetAtTime(0, this.context.currentTime+0.1+(this.decay*0.02), 0.05);

    osc1.stop(this.context.currentTime+1)
    osc2.stop(this.context.currentTime+1)
    modulator1.stop(this.context.currentTime+1)
    modulator2.stop(this.context.currentTime+1)
    modulator3.stop(this.context.currentTime+1)
    modulator4.stop(this.context.currentTime+1)
  }
}
