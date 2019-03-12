export class Controller {
  constructor (repository) {
    this.repository = repository
  }

  findAll (request, response) {
    this.repository.findAll(request.query.sort, request.query.order, request.query.limit)
      .then(entities => response.status(200).send(entities))
      .catch(error => response.status(error.status || 500).send({ message: error.message }))
  }

  findOne (request, response) {
    this.repository.findOne(request.params.id)
      .then(entity => response.status(200).send(entity))
      .catch(error => response.status(error.status || 500).send({ message: error.message }))
  }

  save (request, response) {
    this.repository.save(request.body)
      .then(entity => response.status(201).send(entity))
      .catch(error => response.status(error.status || 500).send({ message: error.message }))
  }

  delete (request, response) {
    this.repository.delete(request.params.id)
      .then(result => response.status(200).send(result))
      .catch(error => response.status(error.status || 500).send({ message: error.message }))
  }

  update (request, response) {
    this.repository.update(request.params.id, request.body)
      .then(entity => response.status(200).send(entity))
      .catch(error => response.status(error.status || 500).send({ message: error.message }))
  }

  search (request, response) {
    this.repository.search(request.query.search)
      .then(entities => response.status(200).send(entities))
      .catch(error => response.status(error.status || 500).send({ message: error.message }))
  }
}
