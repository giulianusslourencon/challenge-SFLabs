const routes = require('express').Router()

routes.use('/users', require('./routes/userRoutes'))

module.exports = routes
