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

module.exports = Empresa
