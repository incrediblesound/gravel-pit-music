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
      const name = `[ ${this.value[i]+1} ]`
      this.context.fillRect(this.x+offset, this.y, 40, 40)
      this.context.clearRect(this.x+offset+1, this.y, 39-(i === 3 ? 1 : 0), 39)
      this.context.fillStyle = 'black'
      this.context.fillText(name, this.x+offset+3, this.y+25, 80);
    }
  }
}
