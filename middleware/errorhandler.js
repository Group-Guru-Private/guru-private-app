
const {Student} = require('../models')

module.exports = (err, req, res, next) => {
  if(err){
    if (err.name === 'SequelizeValidationError') {
      let arrErrors = []
      for (let i = 0; i < err.errors.length; i++) {
          arrErrors.push( err.errors[i].message)
      }
    res.status(err.status).json({message: `${arrErrors}`} )
   
    }
    else {
      console.log(err)
      new Error(err.message)
    }
  }
  else {
    res.status(500).json(err.message)
  }
}