const routes = require('express').Router()

const empresaController = require('../controllers/empresaController')

routes.get('/', empresaController.index)
routes.get('/:id', empresaController.show)
routes.post('/', empresaController.create)
routes.put('/:id', empresaController.update)
routes.delete('/:id', empresaController.destroy)

module.exports = routes
