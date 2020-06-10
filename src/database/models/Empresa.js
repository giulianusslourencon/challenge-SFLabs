function Empresa (data) {
  const {
    _id, nome, cnpj, cep, endereco, numero, cidade, estado
  } = data

  this._id = _id
  this.nome = nome
  this.cnpj = cnpj
  this.cep = cep
  this.endereco = endereco
  this.numero = numero
  this.cidade = cidade
  this.estado = estado
  this.users = []
  this.plantas = []
}

module.exports = {
  create (data) {
    return new Empresa(data)
  },
  update (empresa, data) {
    const {
      _id, nome, cnpj, cep, endereco, numero, cidade, estado
    } = data

    empresa._id = _id
    empresa.nome = nome
    empresa.cnpj = cnpj
    empresa.cep = cep
    empresa.endereco = endereco
    empresa.numero = numero
    empresa.cidade = cidade
    empresa.estado = estado

    return empresa
  }
}
