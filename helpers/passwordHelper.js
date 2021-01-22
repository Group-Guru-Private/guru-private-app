const bcrypt = require('bcryptjs')

function generatePassword (pass) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(pass, salt)
  return hash
}

function verifyPassword (pass, hashPass) {
  return bcrypt.compareSync(pass, hashPass)
}

module.exports = {generatePassword, verifyPassword}