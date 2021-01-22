const jwtHelper = require('../helpers/jwtHelper')
const { User } = require('../models/index')

class authTeacher {
    static async user(req, res, next) {
        try {
            const { token } = req.headers
            if(!token) {
                throw { name: 'TeacherUnauthorized'}
            }
            else {
                const decoded = jwtHelper.verify(token)
                const user = await User.findOne({
                    where: {
                        id: decoded.id,
                        email: decoded.email
                    }
                })
                if(!user) {
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