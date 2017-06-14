export default class Snare {
  constructor(ctx){
    this.context = ctx
    this.config = {
      type: 'triangle'
    }
    this.buffer = noiseBuffer(ctx)
  }
  stopAll(){}
  getNoise(){
    const noise = this.context.createBufferSource();
    noise.buffer = this.buffer
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    noise.connect(noiseFilter);

    const noiseEnvelope = this.context.createGain();
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.context.destination);
    return [ noise, noiseEnvelope ]
  }
  getOscillators(){
  const osc = this.context.createOscillator();
  osc.type = this.config.type;

  const gain = this.context.createGain()
  osc.connect(gain);
  gain.connect(this.context.destination);
  osc.frequency.value = 150
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
