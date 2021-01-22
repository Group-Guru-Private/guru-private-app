const { Teacher } = require('../models/index')
const {generatePassword, verifyPassword} = require('../helpers/passwordHelper')
const { generateToken, verifyToken } = require('../helpers/jwtHelper')

class TeacherController {
    static async register (req, res, next) {
        try {
            console.log('samoe kan tapi iiiiii');
            
            const { name, email, password, role, address, position, telpon_number, subjects, background, price } = req.body
            console.log(name)
            const newTeacher = await Teacher.create({
                name, email, password, role, address, position, telpon_number, subjects, background, price, available_status:false, income:0, rating: 0
            })
            res.status(201).json({
                id: newTeacher.id,
                name: newTeacher.name,
                email: newTeacher.email,
                password: newTeacher.password,
                role: newTeacher.role,
                address: newTeacher.address,
                position: newTeacher.position,
                telpon_number: newTeacher.telpon_number,
                subjects: newTeacher.subjects,
                background: newTeacher.background,
                price: newTeacher.price,
                rating: newTeacher.rating
            })
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const { email, password } = req.body
            const guru = await Teacher.findOne({
                where: {
                    email
                }
            })
            if(!guru) {
                throw {
                    name: 'WrongEmailPassword'
                }
            }
            else {
                if(!verifyPassword(password, guru.password)){
                    throw{ name: 'WrongEmailPassword'}
                }
                else {
                    const token = generateToken({
                        email: guru.email,
                        password: guru.password,
                        role: guru.role,
                        address: guru.address,
                        position: guru.position,
                        telpon_number: guru.telpon_number,
                        subjects: guru.subjects,
                        background: guru.background,
                        price: guru.price,
                        rating: guru.rating
                    })
                    res.status(200).json({ email: guru.email, token})
                }
            }
        }
        catch(err) {
            next(err)
        }
    }

    static async findAll (req, res, next) {
        try {
            const teachers = await Teacher.findAll()
            res.status(200).json(teachers) 
        }
        catch(err){
            next(err)
        }
    }

    static async editProfile (req, res, next) {
        try {
            const { name, email, password, role, address, position, telpon_number, subjects, background, price } = req.body
            const profileUpdated = await Teacher.update({
                name, email, password, role, address, position, telpon_number, subjects, background, price
            }, {
                where: {
                    id: req.params.id
                }, returning: true
            })
            res.status(200).json(profileUpdated[1])
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = TeacherController