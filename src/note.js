export default class Note {
  constructor(idx, type, state, context){
    this.type = type
    this.notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],
    this.state = state
    this.context = context
    this.idx = idx
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x+1, this.y+1, 38, 38)
    const noteIndex = this.state.notes[this.type][this.state.page][this.idx]
    this.context.fillText(this.notes[noteIndex], this.x+15, this.y+25, 15);
  }
  handleClick(){
    const page = this.state.notes[this.type][this.state.page]
    page[this.idx] = page[this.idx] === 11 ? 0 : page[this.idx]+1
    this.render()
  }
}
