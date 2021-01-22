const {generateToken} = require('../helpers/jwtHelper') 
const {generatePassword,verifyPassword} = require('../helpers/passwordHelper')
const Stundent =  require('../models')

class StundentController {

  static register (req,res,next){
    const password = generatePassword(req.body.password)
    const newStundent = {
      name : req.body.name,
      email: req.body.email,
      password: password,
      role: req.body.role,
      address: req.body.address,
      position: req.body.position,
      telpon_number: req.body.telpon_number,
    }
    Stundent.create(newStundent)
      .then (data=>{
        console.log(data)
        res.status(201).json({id: data.id,name: data.name, email: data.email})
      })
      .catch (err=>{
     
        console.log(err)
        res.status(400).json({message: 'register failed'})
      })
  }
  static login(req,res,next){
    const email = req.body.email
    Stundent.findOne({where:{email:email}})
      .then(data=>{
        if(!data){
          res.status(401).json({message: `Account Not Found`})
        }
       else if (verifyPassword(req.body.password, data.password)){
          const access_token = generateToken({id: data.id,email: data.email})
          res.status(200).json({access_token})
       }
        
        else if (!verifyPassword(req.body.password, data.password)){
          res.status(404).json({message: 'Invalid Email/Password'})
          }
      })
      .catch (err=>{
        console.log(err)
        next(err)
      })
  }

  static showAll(req,res,next) {

    Student.findAll({})
    .then((students)=>{
      res.status(200).json(students)
    })
    .catch((error)=>{
      console.log(error)
      next(error)
    }) 
      

  }
  static getStudentbyId (req,res,next){
    const id = +req.params.id
 
       Student.findOne({ where: {id:id} })
        .then((student)=>{
          res.status(200).json(student)
        })
        .catch((error)=>{
          console.log(error)
          next(error)
        }) 
          
        
  }

  static update(req,res,next){

    const password = Bcrypt.hash(req.body.password)

    const editStundent = {
      name : req.body.name,
      email: req.body.email,
      password: password,
      role: req.body.role,
      address: req.body.address,
      position: req.body.position,
      telpon_number: req.body.telpon_number,
    }
     
     const data = Student.update(editStundent, {where: {id: req.params.id},returning: true})
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
            return next(err)
        })
  }


}

module.exports = StundentController