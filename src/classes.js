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
  constructor(word, ctx, x, y){
    this.context = ctx
    this.word = word
    this.x = x
    this.y = y
  }
  render(){
    this.context.fillStyle = 'black'
    this.context.fillText(this.word, this.x+3, this.y+25, 80);
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
