const  {verifyToken}  = require('../helpers/jwtHelper')
const { Teacher } = require('../models/index')

class authTeacher {
    static async user(req, res, next) {
        try {
            const { token } = req.headers
            if(!token) {
                throw { name: 'TeacherUnauthorized'}
            }
            else {
                const decoded = verifyToken(token)
                const teacher = await Teacher.findOne({
                    where: {
                        id: decoded.id,
                        email: decoded.email
                    }
                })
                if(!teacher) {
                    throw { name: 'TeacherUnauthorized' } 
                }
                else {
                    req.loginTeacher = decoded
                    next()
                }
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = authTeacher