const request = require('supertest')
const app = require('../app')
const { Teacher, sequelize } = require('../models')
const { queryInterface } = sequelize
// const {generateToken} = require('../helpers/jwtHelper')
const {generatePassword} = require('../helpers/passwordHelper')

const registTeacher = {
    name: 'bima',
    email: 'bima@mail.com',
    password: generatePassword('123456'),
    role: 'teacher',
    address: 'Jl. Mangga harum manis',
    position: [-6.200000, 106.816666],
    telpon_number: '08123456789',
    subjects: ['Mathematics', 'Chemistry'],
    background: 'Universitas ABC, S1 Mathematics',
    price: 100000,
    image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
}

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
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
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

    it('test failed register with registered email', done => {
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
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "Email has already registered")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty name', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: '',
            password: generatePassword('123456'),
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "email can not be empty, Email must be email format")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty email', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: '',
            email: 'teacher@mail.com',
            password: generatePassword('123456'),
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "name can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty email', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: 'teacher@mail.com',
            password: '',
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "password can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty role', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: 'teacher@mail.com',
            password: generatePassword('123456'),
            role: '',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "role can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty address', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: 'teacher@mail.com',
            password: generatePassword('123456'),
            role: 'teacher',
            address: '',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "address can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty position', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: 'teacher@mail.com',
            password: generatePassword('123456'),
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: '',
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "position can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty telpon_number', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: 'Teacher',
            email: 'teacher@mail.com',
            password: generatePassword('123456'),
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "telpon number can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty subjects', done => {
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
            subjects: '',
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "subject can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty background', done => {
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
            background: '',
            price: 100000,
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "background can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty price', done => {
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
            price: '',
            image_url: 'https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg'
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "price can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty image_url', done => {
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
            price: 100000,
            image_url: ''
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "image url can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed register with empty address', done => {
        request(app)
        .post('/teachers/register')
        .send({
            name: '',
            email: '',
            password: '',
            role: '',
            address: '',
            position: '',
            telpon_number: '',
            subjects: '',
            background: '',
            price: '',
            image_url: ''
        })
        .then(response => {
            const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "name can not be empty, email can not be empty, Email must be email format, password can not be empty, role can not be empty, address can not be empty, position can not be empty, telpon number can not be empty, subject can not be empty, background can not be empty, price can not be empty, image url can not be empty")
              done()
        })
        .catch(err => {
            done(err)
        })
    })
})

