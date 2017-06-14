export default class PlayBtn {
  constructor(ctx, state, x, y){
    this.context = ctx
    this.state = state
    this.x = x
    this.y = y
    this.on = state.isPlaying
  }
  render(){
    this.on = this.state.isPlaying
    this.context.fillStyle = this.on ? 'red' : 'green'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.fillStyle = this.on ? 'black' : 'white'
    this.context.fillText(this.on ? 'STOP' : 'PLAY', this.x+1, this.y+25, 80);
  }
  handleClick(){
    this.state.togglePlay()
    this.on = this.state.isPlaying
    this.render()
  }
}
