const  {verifyToken}  = require('../helpers/jwtHelper')
const { Teacher } = require('../models/index')

class authTeacher {
    static async user(req, res, next) {
        try {
            const { access_token } = req.headers
            if(!access_token) {
                throw { name: 'TeacherUnauthorized'}
            }
            else {
                const decoded = verifyToken(access_token)
                const teacher = await Teacher.findOne({
                    where: {
                        id: decoded.id,
                        // email: decoded.email
                    }
                })
                if (teacher) {
                    req.loginTeacher = decoded
                    next()
                } else throw { name: 'TeacherUnauthorized' } 
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = authTeacher