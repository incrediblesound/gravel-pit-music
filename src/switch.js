import { COLOR } from './constants'

export class BinSwitch {
  constructor(idx, type, state, ctx){
    this.idx = idx
    this.type = type
    this.state = state
    this.context = ctx
    this.x = null
    this.y = null
    this.value = 0
    this.colors = ['black', 'red']
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 37, 37)
    this.context.fillStyle = COLOR
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  handleClick(){
    this.value = (this.value+1) % 2
    this.state.toggleStep(this.idx, this.type, 2)
    this.context.clearRect(this.x, this.y, 37, 37)
    this.context.fillStyle = this.colors[this.value]
    this.context.fillRect(this.x, this.y, 37, 37)
    this.context.fillStyle = COLOR
  }
}

export class OctaveSwitch {
  constructor(idx, type, state, ctx){
    this.idx = idx
    this.type = type
    this.state = state
    this.context = ctx
    this.x = null
    this.y = null
    this.value = 0
    this.colors = ['black', 'red', 'blue']
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 37, 37)
    this.context.fillStyle = COLOR
  }
  setPos(x, y){
    this.x = x
    this.y = y
  }
  handleClick(){
    this.value = (this.value+1) % 3
    this.state.toggleStep(this.idx, this.type, 3)
    this.context.clearRect(this.x, this.y, 37, 37)
    this.context.fillStyle = this.colors[this.value]
    this.context.fillRect(this.x, this.y, 37, 37)
    this.context.fillStyle = COLOR
  }
}
