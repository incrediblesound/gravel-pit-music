export default class Options {
  constructor(options, callBack, ctx, x, y){
    this.context = ctx
    this.idx = 0
    this.options = options
    this.callBack = callBack
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 80, 40)
    this.context.clearRect(this.x+1, this.y+1, 78, 38)
    const text = this.options[this.idx]
    const textWidth = Math.ceil(this.context.measureText(text).width)
    const offset = 40 - textWidth/2
    this.context.fillText(text, this.x+offset, this.y+25, 39);
  }
  handleClick(){
    this.idx = (this.idx+1) % this.options.length
    this.render()
    this.callBack(this.options[this.idx])
  }
}
