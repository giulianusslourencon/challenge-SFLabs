const database = require('../database')

module.exports = {
  index (req, res) {
    const empresas = database.findEmpresa()
    return res.json(empresas)
  },

  create (req, res) {
    const newEmpresa = database.createEmpresa(req.body)

    if (!newEmpresa) {
      return res.status(400).json({
        err: 'Já existe uma empresa registrada com esse id no banco de dados'
      })
    }

    return res.json(newEmpresa)
  },

  show (req, res) {
    const empresa = database.findEmpresa(req.params.id)

    if (!empresa) {
      return res.status(404).json({
        err: 'Não existe uma empresa registrada com esse id no banco de dados'
      })
    }

    return res.json(empresa)
  },

  update (req, res) {
    const updatedEmpresa = database.updateEmpresa(req.params.id, req.body)

    if (!updatedEmpresa) {
      return res.status(404).json({
        err: 'Não existe uma empresa registrada com esse id no banco de dados'
      })
    }

    return res.json(updatedEmpresa)
  },

  destroy (req, res) {
    const deletedEmpresa = database.deleteEmpresa(req.params.id)

    if (!deletedEmpresa) {
      return res.status(404).json({
        err: 'Não existe uma empresa registrada com esse id no banco de dados'
      })
    }

    return res.status(204).send()
  }
}
