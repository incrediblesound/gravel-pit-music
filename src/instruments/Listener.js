export default class Listener {
  setProp(action){
    if(Array.isArray(action.property)){
      // flimsy, just for setting array indexes of properties
      this[action.property[0]][action.property[1]] = action.value
    } else {
      this[action.property] = action.value
    }
  }
}
