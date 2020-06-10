const routes = require('express').Router({ mergeParams: true })
const { celebrate, Segments, Joi } = require('celebrate')

const empresaPlantaRelationController =
  require('../controllers/empresaPlantaRelationController')

routes.put('/', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    planta: Joi.string().required()
  })
}), empresaPlantaRelationController.create)

routes.delete('/:planta', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
    planta: Joi.string().required()
  })
}), empresaPlantaRelationController.destroy)

module.exports = routes
