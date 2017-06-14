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
    this.context.clearRect(this.x, this.y, 40, 40)
    this.context.fillText(this.options[this.idx], this.x+3, this.y+25, 39);
  }
  handleClick(){
    this.idx = (this.idx+1) % this.options.length
    this.render()
    this.callBack(this.options[this.idx])
  }
}
