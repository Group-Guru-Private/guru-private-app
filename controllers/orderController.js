const {Student, Teacher, Order} = require('../models')

class OrderController {
  static async createOrder (req, res, next) {
    try {
      if (!req.params.id) {
        throw {
          status: 404,
          message: `Data Not Found`
        }
      }
      const findTeacher = await Teacher.findByPk(req.params.id)
      if (findTeacher) {
        const payload = {
          StudentId : req.loginStudent.id,
          TeacherId : findTeacher.id,
          subject : req.body.subject,
          distance : +req.body.distance,
          total_price : (+req.body.distance * 5000) + findTeacher.price,
          date: req.body.date,
        }
        const data = await Order.create(payload)
        res.status(201).json(data)
      } else throw {
        status: 404,
        message: `Data Not Found`
      }
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        next({
          name: 'Validation Error',
          status: 400,
          message: err.errors
        })
      }else next(err)
    }
  }
  static async findAllOrder (req, res, next) {
    try {
      const data = await Order.findAll({ include: [Student, Teacher] })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }

  static async getDetail (req, res, next) {
    try {
      const data = await Order.findByPk(req.params.id, {include: [Student, Teacher]})
      if (data) res.status(200).json(data)
      else throw {
        status: 404,
        message: 'Data Not Found'
      }
    } catch (err) {
      next(err)  
    }
  }

  static async finishedOrder (req, res, next) {
    try {
      const findOrder = await Order.findByPk(req.params.id, {include: [Student, Teacher]})
      if (findOrder) {
        const arrPromises = [
          Order.update({ status: true}, { where: {id: req.params.id}, returning: true}),
          Teacher.update({ income: findOrder.Teacher.income + findOrder.total_price }, {where: {id: findOrder.TeacherId}})
        ]
        const finished = await Promise.all(arrPromises)
        if (finished?.length) res.status(200).json(finished[0][1][0])
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }
  static async cancelOrder (req, res, next) {
    try {
      const data = await Order.destroy({ where: {id: req.params.id }})
      res.status(200).json({ message: `Successfully deleted this order !!!` })
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }
}

module.exports = OrderController