import mongoose from 'mongoose'

import { HttpError } from '../utils/http-error'

export class Repository {
  constructor (model) {
    mongoose.Promise = global.Promise
    this.model = model
  }

  findAll (defaultAttributes, query, sort, order, limit) {
    return new Promise((resolve, reject) => {
      this.model.find(query)
        .select(defaultAttributes + ' -_id')
        .sort(order === 'desc' ? '-' + sort : sort)
        .limit(Number(limit))
        .exec()
        .then(entities => resolve(entities))
        .catch(error => reject(new HttpError(error.message, 500)))
    })
  }

  findOne (id) {
    return new Promise((resolve, reject) => {
      this.model.findOne({ id: id })
        .select('-_id -__v')
        .exec()
        .then(entity => entity ? resolve(entity) : reject(new HttpError('entity not found', 404)))
        .catch(error => reject(new HttpError(error.message, 500)))
    })
  }

  save (entity) {
    return new Promise((resolve, reject) => {
      this.findLastId()
        .then(id => { entity.id = id + 1 })
        .then(() => { return this.model.init() })
        .then(() => { return this.model.create(entity) })
        .then(entity => {
          delete entity._doc['_id']
          delete entity._doc['__v']
          resolve(entity)
        })
        .catch(error => reject(new HttpError(error.message, 400)))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.model.findOneAndRemove({ id: id })
        .select('-_id -__v')
        .exec()
        .then(entity => entity ? resolve(entity) : reject(new HttpError('entity not found', 404)))
        .catch(error => reject(new HttpError(error.message, 500)))
    })
  }

  update (id, entity) {
    return new Promise((resolve, reject) => {
      this.model.findOneAndUpdate({ id: id }, entity, { new: true, runValidators: true })
        .select('-_id -__v')
        .exec()
        .then(entity => entity ? resolve(entity) : reject(new HttpError('entity not found', 404)))
        .catch(error => { reject(new HttpError(error.message, 400)) })
    })
  }

  findLastId () {
    return new Promise((resolve, reject) => {
      this.model.find({})
        .select('id')
        .sort('-id')
        .limit(1)
        .exec()
        .then(entities => resolve(entities[0].id))
        .catch(error => reject(new HttpError(error.message, 500)))
    })
  }
}
