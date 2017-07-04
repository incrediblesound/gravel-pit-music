import { bassControlFunction } from './synth'
import { leadControlFunction } from './leadSynth'
import { fmControlFunction } from './fm'
import { kickControlFunction } from './kick'
import { hatControlFunction } from './hat'
import { snareControlFunction } from './snare'

const map = {
  'bass': bassControlFunction,
  'lead': leadControlFunction,
  'fm': fmControlFunction,
  'kick': kickControlFunction,
  'hat': hatControlFunction,
  'snare': snareControlFunction
}

export default map
