export default class Word {
  constructor(word, ctx, x, y, handleClick){
    this.context = ctx
    this.word = word
    this.x = x
    this.y = y
    this.handleClick = handleClick || function(){}
  }
  render(){
    this.context.clearRect(this.x, this.y, 40, 40)
    this.context.fillStyle = 'green'
    this.context.fillText(this.word, this.x+3, this.y+25, 80);
  }
}
