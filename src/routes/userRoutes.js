const routes = require('express').Router()

const userController = require('../controllers/userController')

routes.get('/', userController.index)
routes.get('/:id', userController.show)
routes.post('/', userController.create)
routes.put('/:id', userController.update)
routes.delete('/:id', userController.destroy)

module.exports = routes
