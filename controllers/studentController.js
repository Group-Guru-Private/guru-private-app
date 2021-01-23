const {generateToken} = require('../helpers/jwtHelper') 
const {generatePassword,verifyPassword} = require('../helpers/passwordHelper')
const {Student} =  require('../models')
const bcrypt = require('bcryptjs')

class StudentController {
  static async register (req,res,next){
    const { name, email, password, role, address, position, telpon_number } = req.body
    Student.create({name, email, password, role, address, position, telpon_number})
      .then (data=>{
        res.status(201).json({name: data.name, email: data.email})
      })
      .catch (err=>{
        if(err){
          if (err.name === 'SequelizeValidationError') {
            let arrErrors = []
            for (let i = 0; i < err.errors.length; i++) {
                arrErrors.push( err.errors[i].message)
            }
            next({ status: 400, message: `${arrErrors}`})
          }
          else if (err.name === 'SequelizeUniqueConstraintError') {
            next({ status: 400, message: err.message })
          }
          next(err)
        }
      })
  }

  static login(req,res,next){
    const email = req.body.email
    const password = req.body.password
    if (!password) next({status: 404, message: 'Please input your Password'})
    if (!email) next({status: 404, message: 'Please input your Email' })
    Student.findOne({where:{email:email}})
      .then(data=>{
        if(!data){
          next({status: 401, message: `Account Not Found` })
        }
        else if (verifyPassword(password, data.password )){
          const access_token = generateToken({id: data.id,email: data.email})
          res.status(200).json({ access_token })
        }
        else if (!verifyPassword(password, data.password)){
          next({ status: 404, message: 'Invalid Email/Password'})
        }
      })
      .catch (err=>{
        next(err)
      })
  }

  static showAll(req,res,next) {
    Student.findAll({})
    .then((data)=>{
      res.status(200).json({alldata: data})
    })
    .catch((error)=>{
      next(error)
    })
  }

  static getStudentbyId (req,res,next){
    const id = +req.params.id
    Student.findOne({ where: {id:id} })
      .then((data)=>{
        res.status(200).json({name: data.name, email: data.email, address: data.address, phone: data.telpon_number})
      })
      .catch((error)=>{
        next(error)
      })
  }

  static update(req,res,next){
    const password = generatePassword(req.body.password)
    const editStudent = {
      name : req.body.name,
      email: req.body.email,
      password: password,
      role: req.body.role,
      address: req.body.address,
      position: req.body.position,
      telpon_number: req.body.telpon_number,
    } 
    Student.update(editStudent, {where: {id: req.params.id},returning: true})
      .then(() => {
          res.status(200).json({message: 'Your profile Updated'})
      })
      .catch (err=>{
        if(err){
          if (err.name === 'SequelizeValidationError') {
            let arrErrors = []
            for (let i = 0; i < err.errors.length; i++) {
                arrErrors.push( err.errors[i].message)
            }
            next({ status: 400, message: `${arrErrors}`})
          }
          else if (err.name === 'SequelizeUniqueConstraintError') {
            next({ status: 400, message: err.message })
          }
          next(err)
        }
    })
  }
}

module.exports = StudentController