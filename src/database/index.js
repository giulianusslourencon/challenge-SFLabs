const User = require('./models/User')
// const Empresa = require('./models/Empresa')

const database = {
  users: [],
  empresas: []
}

function getIndexById (entity, id) {
  return database[entity].findIndex(object => object._id === id)
}

module.exports = {
  createUser (data) {
    if (getIndexById('users', data._id) >= 0) return false

    const newUser = User.create(data)
    database.users.push(newUser)
    return newUser
  },
  findUser (id) {
    if (!id) return database.users

    const userIndex = getIndexById('users', id)
    return userIndex >= 0 ? database.users[userIndex] : false
  },
  updateUser (id, data) {
    const userIndex = getIndexById('users', id)
    if (userIndex < 0) return false

    database.users[userIndex] = User.update(database.users[userIndex], data)
    return database.users[userIndex]
  },
  deleteUser (id) {
    const userIndex = getIndexById('users', id)
    if (userIndex < 0) return false

    database.users.splice(userIndex, 1)
    return true
  }
}
