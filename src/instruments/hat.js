import Listener from './Listener'
import ControlValue from '../ui/InstrumentControlValue'

export default class Hat extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.tone = 25
    this.context = ctx
    this.prevOsc = null
    this.buffer = noiseBuffer(ctx)
  }
  getNoise(){
    const noise = this.context.createBufferSource();
    noise.buffer = this.buffer
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = this.tone * 100;
    noise.connect(noiseFilter);

    const noiseEnvelope = this.context.createGain();
    noiseEnvelope.gain.value = this.volume * 0.1
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.context.destination);
    return [ noise, noiseEnvelope ]
  }
  stopAll(){
    if(this.prevOsc){
      this.prevOsc.stop(0)
    }
  }
  play({ step }){
    if(step){
      this.stopAll()
      const time = step === 1 ? 0.01 : 0.05
      const [ noise, noiseEnvelope ] = this.getNoise()
      this.prevOsc = noise
      noise.start(0)
      noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, time);
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

export const hatControlFunction = (state, modules, moduleMap, ctx, x, y) => {
  const initialVolume = state.instruments.hat.volume
  const volume = new ControlValue(ctx, x, y, 'Volume', initialVolume, 10, (value) => {
      state.instruments.hat.setProp({ property: 'volume', value })
  })
  modules.push(volume)
  moduleMap['0/0'] = volume
  moduleMap['1/0'] = volume
  moduleMap['2/0'] = volume

  const initialTone = state.instruments.hat.tone
  const tone = new ControlValue(ctx, x+3*40, y, 'Tone', initialTone, 50, (value) => {
      state.instruments.hat.setProp({ property: 'tone', value })
  })
  modules.push(tone)
  moduleMap['3/0'] = tone
  moduleMap['4/0'] = tone
  moduleMap['5/0'] = tone
}
