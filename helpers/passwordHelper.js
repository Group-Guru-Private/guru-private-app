const bcrypt = require('bcryptjs')

export function generatePassword (pass) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(pass, salt)
  return hash
}

export function verifyPassword (pass, hashPass) {
  return bcrypt.compareSync(pass, hashPass)
}