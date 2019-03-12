import express from 'express'

import { Controller } from './controller'
import { RestaurantRepository } from '../repository/restaurant-repository'

export class RestaurantController extends express.Router {
  constructor () {
    super()

    this.controller = new Controller(new RestaurantRepository())

    this.route('/restaurants')
      .get((request, response) => request.query.search
        ? this.controller.search(request, response)
        : this.controller.findAll(request, response))

    this.route('/restaurants/:id')
      .get((request, response) => this.controller.findOne(request, response))

    this.route('/restaurants')
      .post((request, response) => this.controller.save(request, response))

    this.route('/restaurants/:id')
      .delete((request, response) => this.controller.delete(request, response))

    this.route('/restaurants/:id')
      .put((request, response) => this.controller.update(request, response))
  }
}
