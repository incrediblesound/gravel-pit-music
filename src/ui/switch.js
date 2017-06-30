import { COLOR } from '../constants'

export class BinSwitch {
  constructor(idx, state, ctx){
    this.idx = idx
    this.state = state
    this.context = ctx
    this.x = null
    this.y = null
    this.colors = ['black', 'red']
  }
  render(){
    const page = this.state.getPage()
    this.context.fillStyle = this.colors[page[this.idx].step]
    this.context.fillRect(this.x, this.y, 39, 39)
    this.context.fillStyle = COLOR
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  handleClick(){
    const page = this.state.getPage()
    this.value = (this.value+1) % 2
    page[this.idx].step = this.value
    this.context.clearRect(this.x, this.y, 39, 39)
    this.context.fillStyle = this.colors[page[this.idx].step]
    this.context.fillRect(this.x, this.y, 39, 39)
    this.context.fillStyle = COLOR
  }
}

export class OctaveSwitch {
  constructor(idx, state, ctx){
    this.idx = idx
    this.state = state
    this.context = ctx
    this.x = null
    this.y = null
    this.colors = ['black', 'red', 'blue']
  }
  render(){
    const page = this.state.getPage()
    this.context.fillStyle = this.colors[page[this.idx].step]
    this.context.fillRect(this.x, this.y, 39, 39)
    this.context.fillStyle = page[this.idx].hold ? 'green' : 'yellow'
    this.context.fillRect(this.x, this.y, 10, 10)
    this.context.fillStyle = COLOR
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  handleClick(x, y, innerX, innerY){
    const isHold = innerX <= 10 && innerY <= 10
    const page = this.state.getPage()
    if(isHold){
      page[this.idx].hold = !page[this.idx].hold
    } else {
      this.value = (page[this.idx].step+1) % 3
      page[this.idx].step = this.value
    }
    this.context.clearRect(this.x, this.y, 39, 39)
    this.render()
  }
}
