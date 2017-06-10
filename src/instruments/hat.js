export default class Hat {
  constructor(ctx){
    this.context = ctx
    this.prevOsc = null
  }
  getNoise(){
    const noise = this.context.createBufferSource();
    noise.buffer = noiseBuffer(this.context);
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 2500;
    noise.connect(noiseFilter);

    const noiseEnvelope = this.context.createGain();
    noiseEnvelope.gain.value = 0.4
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.context.destination);
    return [ noise, noiseEnvelope ]
  }
  play(tone, oct){
    if(this.prevOsc){
      this.prevOsc.stop()
    }
    const time = oct === 1 ? 0.01 : 0.05
    const [ noise, noiseEnvelope ] = this.getNoise()
    this.prevOsc = noise
    noise.start()
    noiseEnvelope.gain.setTargetAtTime(0, this.context.currentTime, time);
    noise.stop(this.context.currentTime + 0.30)
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
