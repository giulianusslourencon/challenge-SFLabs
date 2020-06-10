const routes = require('express').Router({ mergeParams: true })
const { celebrate, Segments, Joi } = require('celebrate')

const empresaUserRelationController =
  require('../controllers/empresaUserRelationController')

routes.put('/', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string().required()
  })
}), empresaUserRelationController.create)

routes.delete('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
    userId: Joi.string().required()
  })
}), empresaUserRelationController.destroy)

module.exports = routes
