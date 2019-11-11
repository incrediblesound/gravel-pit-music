export default class SequenceList {
  constructor(state, ctx, x, y, handleClick){
    this.context = ctx
    this.state = state
    this.pageOne = x/40
    this.x = x
    this.y = y
    this.value = [0, 0, 0, 0]
    this.callBack = handleClick
  }
  handleClick(x, y){
    const buttonIdx = x - this.pageOne
    this.value[buttonIdx] = (this.value[buttonIdx] + 1) % 4;
    this.state.trigger({ type: 'set_sequence', sequence: this.value })
    this.render()
  }
  render(){
    this.context.clearRect(this.x, this.y, 40, 160)
    this.context.fillStyle = 'black'
    for(let i = 0; i < 4; i++){
      const offset = 40 * i
      const name = `${this.value[i]+1}`
      this.context.fillRect(this.x+offset, this.y, 40, 40)
      this.context.clearRect(this.x+offset+1, this.y, 39-(i === 3 ? 1 : 0), 39)
      if (this.state.sequenceIndex === i) {
        this.context.beginPath();
        this.context.arc(this.x+(40*i)+6, this.y+6, 4, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'blue'
        this.context.fill();
      }
      this.context.fillStyle = 'black'
      this.context.fillText(name, this.x+offset+17, this.y+25, 80);
    }
  }
}
