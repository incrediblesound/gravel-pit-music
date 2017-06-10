export default class KeySynth {
  constructor(ctx){
    this.context = ctx
    this.config = {
      type: 'sawtooth'
    }
  }
  newOsc(){
    return
  }
  getOscillators(tone, oct){
  const osc = [
    this.context.createOscillator(), this.context.createOscillator(), this.context.createOscillator()
  ]
  const gain = [
    this.context.createGain(), this.context.createGain(), this.context.createGain()
  ]
  const filters = [
    this.context.createBiquadFilter(), this.context.createBiquadFilter()
  ]
  filters[0].frequency.value = 1000
  filters[1].frequency.value = 1000
  osc[0].frequency.value = 55 * oct
  osc[1].frequency.value = 55 * oct
  osc[2].frequency.value = 110 * oct
  osc[0].detune.value = tone * 100
  osc[1].detune.value = tone * 101
  osc[2].detune.value = tone * 99
  osc.forEach((o, i) => {
    o.type = this.config.type
    if(!i){
      o.connect(gain[i])
    } else {
      o.connect(filters[i-1])
      filters[i-1].connect(gain[i])
    }
    gain[i].connect(this.context.destination)
  })
  osc[0].type = 'triangle'
  return [ osc, gain, filters ]
  }
  play(tone, oct){
    const [ osc, gain, filters ] = this.getOscillators(tone, oct)
    let duration = 100
    osc.forEach((o, i) => {
      o.start()
      if(i > 0){
        filters[1].frequency.setTargetAtTime(4000, this.context.currentTime, 0.05);
      }
      gain[i].gain.setTargetAtTime(0, this.context.currentTime, 0.035);
      o.stop(this.context.currentTime+0.5)
    })
  }
}
