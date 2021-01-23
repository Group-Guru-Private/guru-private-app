const  {verifyToken}  = require('../helpers/jwtHelper')
const { Teacher } = require('../models/index')

class authTeacher {
    static async user(req, res, next) {
        try {
            const access_token = req.headers.access_token
            if(!access_token){
              throw {
                status: 401,
                message: `Login First`}
            }
            else{
              const decoded = verifyToken(access_token)
              let id = decoded.id
              req.loginTeacher = decoded
              let data = await Teacher.findOne({where: {id: id}})
              if (data) {
                next()
              }
              else {
                throw {
                  status: 401,
                  message: `Account not found`}
              }
            }
          }
          catch(error){
            next(error)
          }
        }
    }

module.exports = authTeacher