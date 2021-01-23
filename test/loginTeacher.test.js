const request = require('supertest')
const app = require('../app')
const {Teacher} = require('../models')
const { generatePassword } = require('../helpers/passwordHelper')

const registTeacher = {
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
}

let id_teacher = ''
beforeAll( async (done) => {
    try {
      const dataTeacher = await Teacher.create(registTeacher)
      if(dataTeacher) {
          id_teacher = dataTeacher.id
      } 
      done()
    } catch (err) {
      done(err)
    }
})

afterAll( async (done) => {
    try {
        await Teacher.destroy({
            where: {
                id: id_teacher
            }
        })
        done()
    }
    catch(err) {
        done(err)
    }
})


describe('test POST /teacher login', () => {
    it('test login sukses', done => {
        request(app)
        .post('/teachers/login')
        .send({
            email: registTeacher.email,
            password: registTeacher.password
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty("access_token", expect.anything())
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed login with empty email', done => {
        request(app)
        .post('/teachers/login')
        .send({
            email: '',
            password: registTeacher.password
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Email/password incorrect")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed login with empty email', done => {
        request(app)
        .post('/teachers/login')
        .send({
            email: registTeacher.email,
            password: ''
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Email/password incorrect")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed login with invalid password', done => {
        request(app)
        .post('/teachers/login')
        .send({
            email: registTeacher.email,
            password: '1234'
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Email/password incorrect")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed login with invalid email', done => {
        request(app)
        .post('/teachers/login')
        .send({
            email: 'bukan@mail.com',
            password: registTeacher.password
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Email/password incorrect")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

