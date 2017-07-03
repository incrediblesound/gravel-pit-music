import BassSynth from '../instruments/synth'
import { BinSwitch, OctaveSwitch } from './switch'
import Blinker from './Blinker'
import Note from './note'

export default class InstrumentWindow {
  constructor(state, ctx, x, y){
    this.x = x
    this.y = y
    this.parent = state
    this.context = ctx
    this.instrument = 'bass'
    this.moduleMap = {}
    this.build()
  }
  build(){
    for(var i = 0; i < 16; i++){
      this.moduleMap[`${i}/9`] = new Note(i, this, this.context)
      this.moduleMap[`${i}/10`] = new OctaveSwitch(i, this, this.context)
      this.moduleMap[`${i}/11`] = new Blinker(i, this.parent, this.context)
    }
  }
  trigger(message){
    return this.parent.trigger(message)
  }
  setInstrument(instrument){
    this.instrument = instrument
    this.parent.drawScreen()
  }
  getPage(){
    return this.trigger({ type: 'get_page', instrument: this.instrument })
  }
  renderChildren(){
    Object.keys(this.moduleMap).forEach(key => {
      let [ x, y ] = key.split('/')
      x = parseInt(x) * 40
      y = parseInt(y) * 40
      x += this.x
      y += this.y
      const module = this.moduleMap[key]
      if(module.setPos) module.setPos(x, y)
      module.render()
    })
  }
  render(){
    this.context.fillRect(this.x, this.y, 640, 480)
    this.context.clearRect(this.x+1, this.y+1, 638, 478)
    this.renderChildren()
  }
  handleClick(x, y, innerX, innerY){
    let xCell = x - (this.x/40)
    let yCell = y - (this.y/40)
    let module = this.moduleMap[`${xCell}/${yCell}`]
    if(module) module.handleClick(x, y, innerX, innerY)
  }
}

/*
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
0   . . . . . . . . . . .  .  .  .  .  .  .
1   . . . . . . . . . . .  .  .  .  .  .  .
2   . . . . . . . . . . .  .  .  .  .  .  .
3   . . . . . . . . . . .  .  .  .  .  .  .
4   . . . . . . . . . . .  .  .  .  .  .  .
5   . . . . . . . . . . .  .  .  .  .  .  .
6   . . . . . . . . . . .  .  .  .  .  .  .
7   . . . . . . . . . . .  .  .  .  .  .  .
8   . . . . . . . . . . .  .  .  .  .  .  .
9   . . . . . . . . . . .  .  .  .  .  .  .
10  . . . . . . . . . . .  .  .  .  .  .  .
11  . . . . . . . . . . .  .  .  .  .  .  .
*/
