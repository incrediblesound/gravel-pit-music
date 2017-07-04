import Listener from './Listener'
import Control from '../ui/InstrumentControl'

export default class Snare extends Listener {
  constructor(ctx){
    super()
    this.volume = 8
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
      gain.gain.setTargetAtTime(0, this.context.currentTime, 0.04);
      noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, 0.03);
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

export const snareControlFunction = (moduleMap) => {

}
