import {generateToken} from '../helpers/jwtHelper'

class Stundent {

  static register (req,res,next){

    const newUser = {
      name : req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      address: req.body.address,
      position: req.body.position,
      telpon_number: req.body.telpon_number,
  
    }
    User.create(newUser)
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
    User.findOne({where:{email:email}})
      .then(data=>{
        if(!data){
          res.status(401).json({message: `Account Not Found`})
        }
       else if ((req.body.password === data.password)){
          const access_token = generateToken({id: data.id,email: data.email})
          res.status(200).json({access_token})
       }
        
        else if ((req.body.password !== data.password)){
          res.status(404).json({message: 'Invalid Email/Password'})
          }
      })
      .catch (err=>{
        console.log(err)
        next(err)
      })
  }


}

module.exports = Stundent