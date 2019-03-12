import express from 'express'
import bodyParser from 'body-parser'

import { DBConnector } from './utils/db-connector'
import { RestaurantController } from './controller/restaurant-controller'

new DBConnector()
  .connect()
  .then(message => {
    let app = express()
    let port = 3000

    app.use(bodyParser.json())

    app.use((request, response, next) => {
      response.type('json')
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      next()
    })

    app.use('/api', new RestaurantController())
    app.use((request, response, next) => response.status(404).send({ message: 'URL not found' }))
    app.use((request, response, next) => response.status(500).send({ message: 'internal server error' }))

    app.listen(port, () => console.log(message, '\nserver is listening on port', port))
  })
  .catch(error => console.error(error))
