const { Teacher } = require('../models/index')
const {generatePassword, verifyPassword} = require('../helpers/passwordHelper')
const { generateToken, verifyToken } = require('../helpers/jwtHelper')

class TeacherController {
    static async register (req, res, next) {
        try {
            const { name, email, password, role, address, position, telpon_number, subjects, background, price, image_url } = req.body
            const newTeacher = await Teacher.create({
                name, email, password, role, address, position, telpon_number, subjects, background, price, available_status:false, income:0, rating: 0, image_url
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
                rating: newTeacher.rating,
                image_url: newTeacher.image_url
            })
        }
        catch(err) {
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
                    const access_token = generateToken({
                        email: guru.email,
                        id: guru.id
                    })
                    res.status(200).json({ email: guru.email, access_token})
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
            const { name, email, password, role, address, position, telpon_number, subjects, background, price, image_url } = req.body
            const profileUpdated = await Teacher.update(
            { name, email, password, role, address, position, telpon_number, subjects, background, price, image_url }, 
            {
                where: {
                    id: req.params.id
                }, 
                returning: true
            })
            res.status(200).json(profileUpdated[1])
        } catch(err) {
            next(err)
        }
    }

    static async getTeacherById(req, res, next) {
        try {
            const id = +req.params.id
            const teacher = await Teacher.findOne({
                where: {
                    id: id
                }
            })
            if (teacher) res.status(200).json(teacher)
            else throw {status: 404, message: 'Teacher not Found'}
        }catch (error) {
            next(error)
        }
    }
}

module.exports = TeacherController