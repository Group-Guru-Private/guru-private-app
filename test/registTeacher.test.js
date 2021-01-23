const request = require('supertest')
const app = require('../app')
const { Teacher, sequelize } = require('../models')
const { queryInterface } = sequelize
const {generateToken} = require('../helpers/jwtHelper')
const {generatePassword} = require('../helpers/passwordHelper')

afterAll(done=> {
    queryInterface.bulkDelete('Teachers')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('test POST /teachers/register', () => {
    it('test sukses register', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: 'teacher@mail.com',
            password: generatePassword('123456'),
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000
        })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("name", "Teacher")
            expect(body).toHaveProperty("email", "teacher@mail.com")
            expect(body).toHaveProperty("role", "teacher")
            expect(body).toHaveProperty("address", "Jl. Mangga harum manis")
            expect(body).toHaveProperty("position", [-6.200000, 106.816666])
            expect(body).toHaveProperty("telpon_number", "08123456789")
            expect(body).toHaveProperty("subjects", ["Mathematics", "Chemistry"])
            expect(body).toHaveProperty("background", "Universitas ABC, S1 Mathematics")
            expect(body).toHaveProperty("price", 100000)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})
