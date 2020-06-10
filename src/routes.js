const routes = require('express').Router()

routes.use('/users', require('./routes/userRoutes'))
routes.use('/empresas', require('./routes/empresaRoutes'))

routes.use('/empresas/:id/users',
  require('./routes/empresaUserRelationRoutes'))

routes.use('/empresas/:id/plantas',
  require('./routes/empresaPlantaRelationRoutes'))

module.exports = routes
