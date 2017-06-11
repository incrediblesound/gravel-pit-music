import { COLOR } from './constants'

export class Background {
  constructor(ctx, x, y){
    this.context = ctx
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x, this.y, 39, 39)
  }
  handleClick(){}
}

export class PlayBtn {
  constructor(ctx, state, x, y){
    this.context = ctx
    this.state = state
    this.x = x
    this.y = y
    this.on = false
  }
  render(){
    this.context.fillStyle = this.on ? 'green' : 'yellow'
    this.context.fillRect(this.x, this.y, 40, 40)
  }
  handleClick(){
    this.on = !this.on
    this.state.togglePlay(this.on)
    this.render()
  }
}

export class BeatMarker {
  constructor(ctx, x, y){
    this.context = ctx
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'red'
    this.context.fillRect(this.x, this.y, 40, 40)
    this.context.clearRect(this.x, this.y, 30, 30)
  }
  handleClick(){}
}

export class Blinker {
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

export class Word {
  constructor(word, ctx, x, y, handleClick){
    this.context = ctx
    this.word = word
    this.x = x
    this.y = y
    this.handleClick = handleClick || function(){}
  }
  render(){
    this.context.clearRect(this.x, this.y, 40, 40)
    this.context.fillStyle = 'black'
    this.context.fillText(this.word, this.x+3, this.y+25, 80);
  }
}

export class PageButton {
  constructor(state, ctx, x, y, handleClick){
    this.context = ctx
    this.state = state
    this.pageOne = x/40
    this.x = x
    this.y = y
    this.value = 0
    this.callBack = handleClick
  }
  handleClick(x, y){
    const buttonIdx = x - this.pageOne
    this.value = buttonIdx
    this.state.setPage(this.value)
    this.render()
  }
  render(){
    this.context.clearRect(this.x, this.y, 40, 160)
    this.context.fillStyle = 'black'
    for(let i = 0; i < 4; i++){
      const offset = 40 * i
      const name = `Pg ${i+1}`
      this.context.fillRect(this.x+offset, this.y, 40, 40)
      if(i === this.value){
        this.context.fillStyle = '#999'
        this.context.fillRect(this.x+offset, this.y, 39, 39)
      } else {
        this.context.clearRect(this.x+offset, this.y, 39, 39)
      }
      this.context.fillStyle = 'black'
      this.context.fillText(name, this.x+offset+3, this.y+25, 80);
    }
  }
}

export class Options {
  constructor(options, callBack, ctx, x, y){
    this.context = ctx
    this.idx = 0
    this.options = options
    this.callBack = callBack
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.clearRect(this.x, this.y, 40, 40)
    this.context.fillText(this.options[this.idx], this.x+3, this.y+25, 39);
  }
  handleClick(){
    this.idx = (this.idx+1) % this.options.length
    this.render()
    this.callBack(this.options[this.idx])
  }
}
