export default class Note {
  constructor(idx, parent, context, x, y){
    this.notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],
    this.parent = parent
    this.context = context
    this.idx = idx
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x+1, this.y+1, 38, 38)
    const page = this.parent.getPage()
    const noteIndex = page[this.idx].note
    this.context.fillText(this.notes[noteIndex], this.x+15, this.y+25, 15);
  }
  handleClick(){
    const page = this.parent.getPage()
    page[this.idx].note = page[this.idx].note === 11 ? 0 : page[this.idx].note+1
    this.render()
  }
}
