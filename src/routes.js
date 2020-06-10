const routes = require('express').Router()

routes.use('/users', require('./routes/userRoutes'))
routes.use('/empresas', require('./routes/empresaRoutes'))

module.exports = routes
