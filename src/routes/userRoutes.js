const routes = require('express').Router()
const { validator } = require('cpf-cnpj-validator')
const { celebrate, Segments } = require('celebrate')
const Joi = require('@hapi/joi').extend(validator)

const userController = require('../controllers/userController')

routes.get('/', userController.index)

routes.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), userController.show)

routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    cpf: Joi.document().cpf(),
    role: Joi.string().required()
  })
}), userController.create)

routes.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    cpf: Joi.document().cpf(),
    role: Joi.string().required()
  })
}), userController.update)

routes.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), userController.destroy)

module.exports = routes
