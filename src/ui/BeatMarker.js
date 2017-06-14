export default class BeatMarker {
  constructor(ctx, x, y){
    this.context = ctx
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'red'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x, this.y, 30, 30)
  }
  handleClick(){}
}
