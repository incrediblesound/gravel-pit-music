import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'
import ControlOptions from '../ui/InstrumentControlOptions'

const fmModeMethods = {
  'parallel': 'setupOscillators_A',
  'vertical': 'setupOscillators_B'
}

export default class fmSynth extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.context = ctx
    this.decay = 1
    this.prevOsc = null
    this.oscillators = {}
    this.playing = false
    this.waveformOptions = ['square', 'sine', 'sawtooth']
    this.waveform = 'square'
    this.fmMode = 'parallel'
  }
  storeOscillators(data){
    Object.keys(data).forEach(key => {
      this.oscillators[key] = data[key]
    })
  }
  stopAll(){
    if(!this.oscillators.osc1) return
    this.oscillators.gainNode1.gain.setTargetAtTime(0, this.context.currentTime+(this.decay*0.01), 0.05);
    this.oscillators.gainNode2.gain.setTargetAtTime(0, this.context.currentTime+(this.decay*0.01), 0.05);
    this.oscillators.osc1.stop(this.context.currentTime+1)
    this.oscillators.osc2.stop(this.context.currentTime+1)
    this.oscillators.modulator1.stop(this.context.currentTime+1)
    this.oscillators.modulator2.stop(this.context.currentTime+1)
    this.oscillators.modulatorA.stop(this.context.currentTime+1)
    this.oscillators.modulatorB.stop(this.context.currentTime+1)
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
    osc.type = this.waveform

    const gainNode = this.context.createGain()
    gainNode.gain.value = this.volume * 0.02

    const panNode = this.context.createStereoPanner()

    let panValue = 0
    if(pan === 'left') panValue = -0.7
    if(pan === 'right') panValue = 0.7
    panNode.pan.value = panValue

    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 0;

    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(panNode)
    panNode.connect(this.context.destination)
    return [ osc, filter, gainNode ]
  }
  setupOscillators_A(){
    const [ osc1, filter1, gainNode1 ] = this.getOscillator('left')
    const [ osc2, filter2, gainNode2 ] = this.getOscillator('right')
    const [ modulatorA, modulatorGainA ] = this.getModulator(10, 'sawtooth', 70)
    const [ modulatorB, modulatorGainB ] = this.getModulator(10, 'sine', 90)
    const [ modulator1, modulatorGain1 ] = this.getModulator(50, 'sawtooth', 50)
    const [ modulator2, modulatorGain2 ] = this.getModulator(100, 'square', 30)
    modulatorGainA.connect(modulator1.frequency)
    modulatorGainB.connect(modulator2.frequency)
    modulatorGain1.connect(osc1.frequency)
    modulatorGain2.connect(osc2.frequency)
    return [
      osc1, osc2,
      gainNode1, gainNode2,
      modulatorA, modulatorB,
      modulator1, modulator2,
      filter1, filter2
     ]
  }
  setupOscillators_B(){
    const [ osc1, filter1, gainNode1 ] = this.getOscillator()
    const [ osc2, filter2, gainNode2 ] = this.getOscillator()
    const [ modulatorA, modulatorGainA ] = this.getModulator(50, 'square', 35)
    const [ modulatorB, modulatorGainB ] = this.getModulator(10, 'sine', 50)
    const [ modulator1, modulatorGain1 ] = this.getModulator(5, 'sine', 30)
    const [ modulator2, modulatorGain2 ] = this.getModulator(50, 'square', 25)
    modulatorGainA.connect(modulator1.frequency)
    modulatorGain1.connect(modulatorB.frequency)
    modulatorGainB.connect(osc1.frequency)
    gainNode1.connect(osc2.frequency)
    return [
      osc1, osc2,
      gainNode1, gainNode2,
      modulatorA, modulatorB,
      modulator1, modulator2,
      filter1, filter2
     ]
  }
  play({ step, note, hold }){
    if(step && !hold){
      this.stopAll()
      const methodName = fmModeMethods[this.fmMode]
      const [
        osc1, osc2,
        gainNode1, gainNode2,
        modulatorA, modulatorB,
        modulator1, modulator2,
        filter1, filter2
      ] = this[methodName](note, step)
      this.storeOscillators({
        osc1, osc2,
        modulatorA, modulatorB,
        modulator1, modulator2,
        gainNode1, gainNode2
      })
      modulatorA.start()
      modulatorB.start()
      modulator1.start()
      modulator2.start()
      osc1.start()
      osc2.start()
      filter1.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03)
      filter2.frequency.setTargetAtTime(5000, this.context.currentTime, 0.03)
      this.playing = true
    }
    if((step && this.playing) || (hold && step && this.playing)){
      this.oscillators.osc1.detune.value = note*101
      this.oscillators.osc1.frequency.value = step*220
      this.oscillators.osc2.detune.value = note*99
      this.oscillators.osc2.frequency.value = step*220
    }
    if(!step && this.oscillators.osc1){
      this.stopAll()
    }
  }
}

export const fmControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.fm.volume
  const volume = new ControlValue(ctx, x, y, 'Volume', initialVolume, 10, (value) => {
      state.instruments.fm.setProp({ property: 'volume', value })
  })
  modules.push(volume)
  moduleMap['0/0'] = volume
  moduleMap['1/0'] = volume
  moduleMap['2/0'] = volume

  const initialDecay = state.instruments.fm.decay
  const decay = new ControlValue(ctx, x, y+40, 'Decay', initialDecay, 9, (value) => {
      if(value === 0) value += 1
      state.instruments.fm.setProp({ property: 'decay', value })
  })
  modules.push(decay)
  moduleMap['0/1'] = decay
  moduleMap['1/1'] = decay
  moduleMap['2/1'] = decay

  const waveform = new ControlOptions(ctx, x+3*40, y, 'Waveform', ['square', 'sine','sawtooth'],
  state.instruments.fm.waveform,
  (value) => {
    state.instruments.fm.setProp({ property: 'waveform', value })
  })
  modules.push(waveform)
  moduleMap['3/0'] = waveform
  moduleMap['4/0'] = waveform
  moduleMap['5/0'] = waveform
  moduleMap['6/0'] = waveform

  const fmMode = new ControlOptions(ctx, x+3*40, y+40, 'FM Mode', ['vertical', 'parallel'],
  state.instruments.fm.fmMode,
  (value) => {
    state.instruments.fm.setProp({ property: 'fmMode', value })
  })
  modules.push(fmMode)
  moduleMap['3/1'] = fmMode
  moduleMap['4/1'] = fmMode
  moduleMap['5/1'] = fmMode
  moduleMap['6/1'] = fmMode
}
