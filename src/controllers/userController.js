const database = require('../database')

module.exports = {
  index (req, res) {
    const users = database.findUser()
    return res.json(users)
  },

  create (req, res) {
    const newUser = database.createUser(req.body)

    if (!newUser) {
      return res.status(400).json({
        err: 'Já existe um usuário registrado com esse id no banco de dados'
      })
    }

    return res.json(newUser)
  },

  show (req, res) {
    const user = database.findUser(req.params.id)

    if (!user) {
      return res.status(404).json({
        err: 'Não existe um usuário registrado com esse id no banco de dados'
      })
    }

    return res.json(user)
  },

  update (req, res) {
    const updatedUser = database.updateUser(req.params.id, req.body)

    if (!updatedUser) {
      return res.status(404).json({
        err: 'Não existe um usuário registrado com esse id no banco de dados'
      })
    }

    return res.json(updatedUser)
  },

  destroy (req, res) {
    const deletedUser = database.deleteUser(req.params.id)

    if (!deletedUser) {
      return res.status(404).json({
        err: 'Não existe um usuário registrado com esse id no banco de dados'
      })
    }

    return res.status(204).send()
  }
}
