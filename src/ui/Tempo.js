export default class PlayBtn {
  constructor(state, ctx, x, y){
    this.context = ctx
    this.state = state
    this.x = x
    this.y = y
  }
  render(){
    const tempoText = `${this.state.tempo}/bpms`
    this.context.fillStyle = 'black'
    this.context.clearRect(this.x, this.y, 65, 40)
    this.context.fillText('+', this.x+25, this.y+10, 80);
    this.context.fillText('-', this.x+26, this.y+40, 80);
    this.context.fillText(tempoText, this.x, this.y+25, 80);
  }
  handleClick(x, y, innerX, innerY){
    const section = Math.floor(innerY/20)
    this.state.tempo = section ? this.state.tempo-1 : this.state.tempo+1
    this.render()
  }
}
