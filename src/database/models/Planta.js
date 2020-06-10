function Planta (planta) {
  this.planta = planta
}

module.exports = {
  create (planta) {
    return new Planta(planta)
  }
}
