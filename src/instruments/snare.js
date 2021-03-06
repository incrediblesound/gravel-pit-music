import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'

export default class Snare extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.decay = 4
    this.context = ctx
    this.config = {
      type: 'triangle'
    }
    this.buffer = noiseBuffer(ctx)
  }
  setVolume(value){
    this.volume = value
  }
  stopAll(){}
  getNoise(){
    const noise = this.context.createBufferSource();
    noise.buffer = this.buffer

    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    const noiseEnvelope = this.context.createGain();
    noiseEnvelope.gain.value = this.volume * 0.1

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.context.destination);
    return [ noise, noiseEnvelope ]
  }
  getOscillators(){
  const osc = this.context.createOscillator();
  osc.type = this.config.type;
  osc.frequency.value = 150

  const gain = this.context.createGain()
  gain.gain.value = this.volume * 0.1
  osc.connect(gain);
  gain.connect(this.context.destination);
  return [ osc, gain ]
  }
  play({ step }){
    if(step){
      const [ osc, gain ] = this.getOscillators()
      const [ noise, noiseEnvelope ] = this.getNoise()
      osc.start()
      noise.start()
      gain.gain.setTargetAtTime(0, this.context.currentTime, this.decay * 0.01);
      noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, this.decay * 0.01);
      osc.stop(this.context.currentTime + 0.30)
      noise.stop(this.context.currentTime + 0.30)
    }
  }
}

function noiseBuffer(context) {
  const bufferSize = context.sampleRate;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const output = buffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

export const snareControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.snare.volume
  const volume = new ControlValue(ctx, x, y, 'Volume', initialVolume, 10, (value) => {
      state.instruments.snare.setProp({ property: 'volume', value })
  })
  modules.push(volume)
  moduleMap['0/0'] = volume
  moduleMap['1/0'] = volume
  moduleMap['2/0'] = volume

  const initialDecay = state.instruments.snare.decay
  const decay = new ControlValue(ctx, x+(3*40), y, 'Decay', initialDecay, 10, value => {
    state.instruments.snare.setProp({ property: 'decay', value })
  })
  modules.push(decay)
  moduleMap['3/0'] = decay
  moduleMap['4/0'] = decay
  moduleMap['5/0'] = decay

}
