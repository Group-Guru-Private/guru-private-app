const request = require('supertest')
const app = require('../app')
const {generatePassword} = require('../helpers/passwordHelper')
const {Teacher} = require('../models')

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

describe('test GET /teachers', () => {
    it('test get teachers sukses', done => {
        request(app)
        .get('/teachers')
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(200);
            expect(body[0]).toHaveProperty("name", expect.anything());
            expect(body[0]).toHaveProperty("email", expect.anything());
            expect(body[0]).toHaveProperty("role", expect.anything());
            expect(body[0]).toHaveProperty("address", expect.anything());
            expect(body[0]).toHaveProperty("position", expect.anything());
            expect(body[0]).toHaveProperty("telpon_number", expect.anything());
            expect(body[0]).toHaveProperty("subjects", expect.anything());
            expect(body[0]).toHaveProperty("background", expect.anything());
            expect(body[0]).toHaveProperty("price", expect.any(Number));
            expect(body[0]).toHaveProperty("image_url");
            done();
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    describe('Success getbyid', () => {
        test('should response with success message', (done) => {
            request(app)
            .get(`/teachers/${id_teacher}`)
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                return done(err)
                }
                expect(status).toBe(200)
                done()
            })
        })
      })
})