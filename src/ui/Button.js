export default class Button {
  constructor(text, ctx, x, y, handleClick){
    this.x = x
    this.y = y
    this.text = text
    this.width = Math.ceil(ctx.measureText(text).width)
    this.toggled = false
    this.context = ctx
    this.callBack = handleClick
  }
  handleClick(x, y){
    this.toggled = !this.toggled
    this.callBack(this.toggled)
    this.render()
  }
  render(){
    this.context.clearRect(this.x, this.y, this.width+10, 40)
    this.context.fillStyle = 'black'
      this.context.fillRect(this.x, this.y, this.width+10, 40)
      if(this.isToggled ? this.isToggled() : this.toggled){
        this.context.fillStyle = '#999'
        this.context.fillRect(this.x+1, this.y, this.width+9, 39)
      } else {
        this.context.clearRect(this.x+1, this.y, this.width+9, 39)
      }
      this.context.fillStyle = 'black'
      this.context.fillText(this.text, this.x+5, this.y+25, this.width+3);
  }
}
