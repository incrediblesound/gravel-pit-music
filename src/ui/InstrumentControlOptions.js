import Options from './Options'

export default class ControlOptions {
  constructor(ctx, x, y, text, options, currentValue, cb){
    this.context = ctx
    this.x = x
    this.y = y
    this.text = text
    this.valueInput = new Options({
      options, currentValue, cb, ctx, x: x+80, y
    })
  }
  handleClick(x, y, innerX, innerY){
    this.valueInput.handleClick(x, y, innerX, innerY)
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 120, 40)
    this.context.clearRect(this.x+1, this.y+1, 118, 38)
    this.context.fillText(this.text, this.x+5, this.y+25, 80);
    this.valueInput.render()
  }
}
