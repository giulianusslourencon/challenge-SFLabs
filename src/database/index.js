const User = require('./models/User')
const Empresa = require('./models/Empresa')
const Planta = require('./models/Planta')

const database = {
  users: [],
  empresa: []
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

    // Remove user do banco de dados
    database.users.splice(userIndex, 1)

    // Remove todas as relações desse user com as empresas
    database.empresa.forEach(empresa => {
      this.removeUserFromEmpresa(id, empresa._id)
    })

    return true
  },

  createEmpresa (data) {
    if (getIndexById('empresa', data._id) >= 0) return false

    const newEmpresa = Empresa.create(data)
    database.empresa.push(newEmpresa)
    return newEmpresa
  },

  findEmpresa (id) {
    if (!id) {
      const mappedUsers = []
      // Mapeia os campos de ids dos usuarios preenchendo com todas as informações
      database.empresa.forEach(empresa => {
        empresa.users = empresa.users.map(userId => this.findUser(userId))
        mappedUsers.push(empresa)
      })
      return mappedUsers
    }

    const empresaIndex = getIndexById('empresa', id)
    return empresaIndex >= 0
      ? database.empresa[empresaIndex].map(userId => this.findUser(userId))
      : false
  },

  updateEmpresa (id, data) {
    const empresaIndex = getIndexById('empresa', id)
    if (empresaIndex < 0) return false

    database.empresa[empresaIndex] = Empresa.update(database.empresa[empresaIndex], data)
    return database.empresa[empresaIndex]
  },

  deleteEmpresa (id) {
    const empresaIndex = getIndexById('empresa', id)
    if (empresaIndex < 0) return false

    database.empresa.splice(empresaIndex, 1)
    return true
  },

  addUserToEmpresa (userId, empresaId) {
    const userIndex = getIndexById('users', userId)
    const empresaIndex = getIndexById('empresa', empresaId)
    if (userIndex < 0 || empresaIndex < 0) return false

    database.empresa[empresaIndex].users.push(userId)
    return database.empresa[empresaIndex]
  },

  removeUserFromEmpresa (userId, empresaId) {
    const empresaIndex = getIndexById('empresa', empresaId)
    if (empresaIndex < 0) return false

    if (!database.empresa[empresaIndex].users.includes(userId)) return false

    database.empresa[empresaIndex].users =
      database.empresa[empresaIndex].users.filter(user => user !== userId)
    return database.empresa[empresaIndex]
  },

  addPlantaToEmpresa (planta, empresaId) {
    const empresaIndex = getIndexById('empresa', empresaId)
    if (empresaIndex < 0) return false

    database.empresa[empresaIndex].plantas.push(Planta.create(planta))
    return database.empresa[empresaIndex]
  },

  removePlantaFromEmpresa (planta, empresaId) {
    const empresaIndex = getIndexById('empresa', empresaId)
    if (empresaIndex < 0) return false

    database.empresa[empresaIndex].plantas =
      database.empresa[empresaIndex].plantas
        .filter(plantaObj => plantaObj.planta !== planta)
    return database.empresa[empresaIndex]
  }
}
