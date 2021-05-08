import { EventEmitter } from 'events'

class Events extends EventEmitter {
  constructor(){
    super()
  }
}

const events = new Events()
export { events }
