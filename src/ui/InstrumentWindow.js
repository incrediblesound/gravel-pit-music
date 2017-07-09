import BassSynth from '../instruments/synth'
import { BinSwitch, OctaveSwitch } from './switch'
import Blinker from './Blinker'
import Note from './note'
import instrumentControlFunctions from '../instruments/instrumentControlFunctions'

export default class InstrumentWindow {
  constructor(state, ctx, x, y){
    this.x = x
    this.y = y
    this.parent = state
    this.context = ctx
    this.instrument = 'bass'
    this.instrumentControlMap = {}
    this.moduleMap = {}
    this.children = []
    this.instrumentControls = []
    this.build()
  }
  push(child){
    this.children.push(child)
    return child
  }
  build(){
    for(var i = 0; i < 16; i++){
      this.moduleMap[`${i}/9`] = this.push(new Note(i, this, this.context, this.x+i*40, this.y+9*40))
      this.moduleMap[`${i}/10`] = this.push(new OctaveSwitch(i, this, this.context, this.x+i*40, this.y+10*40))
      this.moduleMap[`${i}/11`] = this.push(new Blinker(i, this.parent, this.context, this.x+i*40, this.y+11*40))
    }
    this.buildInstrumentControls()
  }
  buildInstrumentControls(){
    instrumentControlFunctions[this.instrument](
      this.parent,
      this.instrumentControls,
      this.instrumentControlMap,
      this.context,
      this.x, this.y
    )
  }
  trigger(message){
    return this.parent.trigger(message)
  }
  setInstrument(instrument){
    this.instrument = instrument
    this.instrumentControls = []
    this.instrumentControlMap = {}
    this.build()
    this.parent.drawScreen()
  }
  getPage(){
    return this.trigger({ type: 'get_page', instrument: this.instrument })
  }
  renderChildren(){
    this.children.forEach(child => child.render())
    this.instrumentControls.forEach(child => child.render())
  }
  render(){
    this.context.fillRect(this.x, this.y, 640, 480)
    this.context.clearRect(this.x+1, this.y+1, 638, 478)
    this.renderChildren()
  }
  handleClick(x, y, innerX, innerY){
    let xCell = x - (this.x/40)
    let yCell = y - (this.y/40)
    let key = `${xCell}/${yCell}`
    let module = this.moduleMap[key] || this.instrumentControlMap[key]
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
