import mongoose from 'mongoose'

import { Restaurant, COLLECTION_NAME } from '../model/restaurant'
import { Repository } from './repository'

export class RestaurantRepository extends Repository {
  constructor () {
    super(mongoose.model(COLLECTION_NAME, new Restaurant()))
    this.defaultAttributes = 'id name photo rating'
  }

  findAll (sort, order, limit) {
    let query = {}
    return super.findAll(this.defaultAttributes, query, sort, order, limit)
  }

  findOne (id) {
    return super.findOne(id)
  }

  save (restaurant) {
    return super.save(restaurant)
  }

  delete (id) {
    return super.delete(id)
  }

  update (id, restaurant) {
    return super.update(id, restaurant)
  }

  search (text) {
    text = new RegExp(text, 'i')
    const query = new mongoose.Query()
    query.or([
      { name: text },
      { address: text },
      { phone_number: text },
      { opening_hours: text }
    ])
    return super.findAll(this.defaultAttributes, query, '', '', '')
  }
}
