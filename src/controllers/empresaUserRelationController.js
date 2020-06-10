const database = require('../database')

module.exports = {
  create (req, res) {
    const newRelation =
      database.addUserToEmpresa(req.body.userId, req.params.id)

    if (!newRelation) {
      return res.status(400).json({
        err: 'Erro na inserção dessa relação, verifique os ids passados'
      })
    }

    return res.json(newRelation)
  },

  destroy (req, res) {
    const deletedRelation =
      database.removeUserFromEmpresa(req.params.userId, req.params.id)

    if (!deletedRelation) {
      return res.status(400).json({
        err: 'Erro na remoção dessa relação, verifique os ids passados'
      })
    }

    return res.json(deletedRelation)
  }
}
