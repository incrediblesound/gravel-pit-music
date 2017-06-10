export default class Note {
  constructor(idx, type, state, context){
    this.type = type
    this.notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],
    this.noteIndex = 0
    this.state = state
    this.context = context
    this.state.notes[type][idx] = this
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x, this.y, 39, 39)
    this.context.fillText(this.notes[this.noteIndex], this.x+15, this.y+25, 15);
  }
  handleClick(){
    this.noteIndex = this.noteIndex === 11 ? 0 : this.noteIndex+1
    this.render()
  }
}
