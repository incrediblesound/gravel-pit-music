export default class Blinker {
  constructor(i, state, ctx){
    this.context = ctx
    state.blinkers[i] = this
    this.idx = i
  }
  render(){
    if(this.on || this.idx % 4 === 0){
      this.drawCircle()
    } else {
      this.context.clearRect(this.x-1, this.y-1, 39, 39)
    }
  }
  drawCircle(){
    this.context.beginPath();
    this.context.arc(this.x+20, this.y+20, 8, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.idx % 4 ? 'red' : 'blue';
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#003300';
    this.context.stroke();
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  handleClick(){}
  toggle(){
    this.on = !this.on
    this.render()
  }
}
