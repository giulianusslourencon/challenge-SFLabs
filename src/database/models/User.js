function User (data) {
  const { _id, nome, email, cpf, role } = data

  this._id = _id
  this.nome = nome
  this.email = email
  this.cpf = cpf
  this.role = role
}

module.exports = {
  create (data) {
    return new User(data)
  },
  update (user, data) {
    const { nome, email, cpf, role } = data

    user.nome = nome
    user.email = email
    user.cpf = cpf
    user.role = role

    return user
  }
}
