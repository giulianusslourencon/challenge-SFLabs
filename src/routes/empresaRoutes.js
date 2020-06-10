const routes = require('express').Router()
const { validator } = require('cpf-cnpj-validator')
const { celebrate, Segments } = require('celebrate')
const Joi = require('@hapi/joi').extend(validator)

const empresaController = require('../controllers/empresaController')

routes.get('/', empresaController.index)

routes.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), empresaController.show)

routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
    nome: Joi.string().required(),
    cnpj: Joi.document().cnpj(),
    cep: Joi.string().length(8),
    endereco: Joi.string().required(),
    numero: Joi.number().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required().length(2)
  })
}), empresaController.create)

routes.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
    nome: Joi.string().required(),
    cnpj: Joi.document().cnpj(),
    cep: Joi.string().length(8),
    endereco: Joi.string().required(),
    numero: Joi.number().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required().length(2)
  })
}), empresaController.update)

routes.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), empresaController.destroy)

module.exports = routes
