export default class Listener {
  setProp(action){
    this[action.property] = action.value
  }
}
