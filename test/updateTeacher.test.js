const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { Teacher } = require('../models/index')
const { generatePassword } = require('../helpers/passwordHelper')
const { generateToken } = require('../helpers/jwtHelper')

let access_token;
let number;

afterAll(done => {
    queryInterface.bulkDelete('Teachers')
      .then(() => {
        done();
      })
      .catch(err => {
        done();
    })
})

beforeAll(done => {
    Teacher.create({
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
    })
      .then(teacher => {
        access_token = generateToken({
          id: teacher.id, 
          name: teacher.name
        })
        number = teacher.id
        done();
      })
      .catch(err => {
        done(err);
      })
})

describe('EDIT Teacher PUT/teachers:id', () => {
    describe('Success edit', () => {
    test('should response with success message', (done) => {
        request(app)
        .put(`/teachers/${number}`)
        .set('access_token', access_token)
        .send({
            name: 'krishna',
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
        })
        .end((err, res) => {
            const {body, status} = res
            if (err) {
            return done(err)
            }
            expect(status).toBe(200)
            expect(body[0]).toHaveProperty("name", "krishna")
            expect(body[0]).toHaveProperty("email", "bima@mail.com")
            expect(body[0]).toHaveProperty("role", "teacher")
            expect(body[0]).toHaveProperty("address", "Jl. Mangga harum manis")
            expect(body[0]).toHaveProperty("position", [-6.200000, 106.816666])
            expect(body[0]).toHaveProperty("telpon_number", "08123456789")
            expect(body[0]).toHaveProperty("subjects", ["Mathematics", "Chemistry"])
            expect(body[0]).toHaveProperty("background", "Universitas ABC, S1 Mathematics")
            expect(body[0]).toHaveProperty("price", 100000)
            expect(body[0]).toHaveProperty("image_url", "https://www.abadikini.com/media/files/2019/09/IMG_20190908_191823-390x220.jpg")
            done()
        })
    })
    })

    describe('test failed update with empty name', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: '',
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
            })
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','name can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty email', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','email can not be empty, Email must be email format')
              done()
            })
        })
    })

    describe('test failed update with empty role', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','role can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty password', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','password can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty address', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','address can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty position', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','position can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty telpon_number', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','telpon number can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty subjects', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','subject can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty background', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','background can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty price', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
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
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','price can not be empty')
              done()
            })
        })
    })

    describe('test failed update with empty image_url', () => {
        test('should response with error message', (done) => {
          request(app)
            .put(`/teachers/${number}`)
            .set('access_token', access_token)
            .send({
                name: 'bima',
                email: 'bima@mail.com',
                password: generatePassword('123456'),
                role: 'teacher',
                address: 'Jl. Mangga harum manis',
                position: [-6.200000, 106.816666],
                telpon_number: '08123456789',
                subjects: ['Mathematics', 'Chemistry'],
                background: 'Universitas ABC, S1 Mathematics',
                price: 10000,
                image_url: ''
            })
            .end((err, res) => {
              const {body, status} = res
              if (err) {
                return done(err)
              }
              expect(status).toBe(400)
              expect(body).toHaveProperty('message','image url can not be empty')
              done()
            })
        })
    })
})