export default class Volume {
  constructor(state, ctx, x, y, cb){
    this.context = ctx
    this.state = state
    this.value = 8
    this.x = x
    this.y = y
    this.callback = cb
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.clearRect(this.x, this.y, 40, 40)
    this.context.fillText('+', this.x+20, this.y+13, 40)
    this.context.fillText('-', this.x+21, this.y+37, 40)
    this.context.fillText(this.value, this.x, this.y+25, 40)
  }
  handleClick(x, y, innerX, innerY){
    const section = Math.floor(innerY/20)
    this.value = Math.abs((section ? this.value-1 : this.value+1) % 10)
    this.callback(this.value)
    this.render()
  }
}
