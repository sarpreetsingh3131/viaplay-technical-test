import mongoose from 'mongoose'

export class DBConnector {
  constructor () {
    mongoose.Promise = global.Promise
    this.uri = 'mongodb://mongo:27017/viaplay'
  }

  connect () {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.uri, { useNewUrlParser: true })
        .then(() => {
          mongoose.set('useCreateIndex', true)
          resolve('connected to DB')
        })
        .catch(error => reject(error))
    })
  }
}
