export default class ValueInput {
  constructor({ ctx, x, y, initialValue, maxValue, cb }){
    this.context = ctx
    this.value = initialValue
    this.maxValue = maxValue
    this.x = x
    this.y = y
    this.callback = cb
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x+1, this.y+1, 38, 38)
    this.context.fillText('+', this.x+20, this.y+13, 40)
    this.context.fillText('-', this.x+21, this.y+37, 40)
    this.context.fillText(this.value, this.x+5, this.y+25, 40)
  }
  handleClick(x, y, innerX, innerY){
    const section = Math.floor(innerY/20)
    this.value = Math.abs((section ? this.value-1 : this.value+1) % this.maxValue)
    this.callback(this.value)
    this.render()
  }
}
