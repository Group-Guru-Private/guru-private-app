const {Order} = require('../models')

module.exports = async (req, res, next) => {
  try {
    const isValid = await Order.findOne({
      where: {
        id: req.params.id,
        StudentId: req.loginStudent.id
      }
    })
    if (isValid) next()
    else throw {
      status: 401,
      message: `You aren't authorized !`
    }
  } catch (err) {
    next(err)
  }
}