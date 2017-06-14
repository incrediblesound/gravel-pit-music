export default class Blinker {
  constructor(i, state, ctx){
    this.context = ctx
    state.blinkers[i] = this
  }
  render(){
    if(this.on){
      this.context.beginPath();
      this.context.arc(this.x+20, this.y+20, 8, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'red';
      this.context.fill();
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#003300';
      this.context.stroke();
    } else {
      this.context.clearRect(this.x, this.y, 40, 40)
    }
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
