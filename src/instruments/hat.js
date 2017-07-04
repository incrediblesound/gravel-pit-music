import Listener from './Listener'
import Control from '../ui/InstrumentControl'

export default class Hat extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
    this.context = ctx
    this.prevOsc = null
    this.buffer = noiseBuffer(ctx)
  }
  getNoise(){
    const noise = this.context.createBufferSource();
    noise.buffer = this.buffer
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 2500;
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

export const hatControlFunction = (moduleMap) => {

}
