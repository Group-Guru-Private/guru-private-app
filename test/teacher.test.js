// const request = require('supertest')
// const app = require('../app')
// const { Teacher, sequelize } = require('../models')
// const { queryInterface } = sequelize
// const {generateToken} = require('../helpers/jwtHelper')
// const {generatePassword} = require('../helpers/passwordHelper')

// let number
// let token

// afterAll(done=> {
//     queryInterface.bulkDelete('Teachers')
//     .then(() => {
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
// })

// // beforeAll(done => {
// //     Teacher.create({
// //         name: 'bima',
// //         email: 'bima@mail.com',
// //         password: generatePassword('123456'),
// //         role: 'teacher',
// //         address: 'Jl. Mangga harum manis',
// //         position: [-6.200000, 106.816666],
// //         telpon_number: '08123456789',
// //         subjects: ['Mathematics', 'Chemistry'],
// //         background: 'Universitas ABC, S1 Mathematics',
// //         price: 100000
// //     })
// //       .then(admin => {
// //         token = generateToken({
// //           id: admin.id, 
// //           name: admin.name, 
// //           email: admin.email, 
// //           password: admin.password, 
// //           role: admin.role, 
// //           address: admin.address, 
// //           position: admin.position, 
// //           telpon_number: admin.telpon_number, 
// //           subjects: admin.subjects,
// //           background: admin.background,
// //           price: admin.price
// //         })
// //         return User.create({
// //             name: 'bima',
// //             email: 'bima@mail.com',
// //             password: generatePassword('123456'),
// //             role: 'teacher',
// //             address: 'Jl. Mangga harum manis',
// //             position: [-6.200000, 106.816666],
// //             telpon_number: '08123456789',
// //             subjects: ['Mathematics', 'Chemistry'],
// //             background: 'Universitas ABC, S1 Mathematics',
// //             price: 100000
// //         })
// //       })
// // })

// describe('test POST /teachers/register', () => {
//     it('test sukses register', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Teacher',
//             email: 'teacher@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(201)
//             expect(body).toHaveProperty("id", expect.any(Number))
//             expect(body).toHaveProperty("name", "Teacher")
//             expect(body).toHaveProperty("email", "teacher@mail.com")
//             expect(body).toHaveProperty("role", "teacher")
//             expect(body).toHaveProperty("address", "Jl. Mangga harum manis")
//             expect(body).toHaveProperty("position", [-6.200000, 106.816666])
//             expect(body).toHaveProperty("telpon_number", "08123456789")
//             expect(body).toHaveProperty("subjects", ["Mathematics", "Chemistry"])
//             expect(body).toHaveProperty("background", "Universitas ABC, S1 Mathematics")
//             expect(body).toHaveProperty("price", 100000)
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test already registered email', done => {
//         request(app)
//           .post('/teachers/register')
//           .send({
//             name: 'Teacher',
//             email: 'teacher@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//           .then(response => {
//             const { body, status } = response;
//             expect(status).toEqual(400);
//             expect(body).toHaveProperty("message", "Email has already registered");
//             done();
//           })
//           .catch(err => {
//             done(err);
//           })
//       })

//       it('Test failed to register due to email format errors', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Teacher',
//             email: 'teacher',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "Email must be email format")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty name', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: '',
//             email: 'teacher@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "name can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty email', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: '',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "email can not be empty, Email must be email format")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty password', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: '',
//             role: 'teacher',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "password can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty role', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: '',
//             address: 'Jl. Mangga harum manis',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "role can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty address', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: '',
//             position: [-6.200000, 106.816666],
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "address can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty position', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'jakarta',
//             position: '',
//             telpon_number: '08123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "position can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty telpon_number', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'jakarta',
//             position: '[-6.200000, 106.816666]',
//             telpon_number: '',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "telpon number can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty subject', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'jakarta',
//             position: '[-6.200000, 106.816666]',
//             telpon_number: '8123456789',
//             subjects: '',
//             background: 'Universitas ABC, S1 Mathematics',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "subject can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty background', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'jakarta',
//             position: '[-6.200000, 106.816666]',
//             telpon_number: '8123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: '',
//             price: 100000
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "background can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it('Test can not register because empty price', done => {
//         request(app)
//         .post('/teachers/register')
//         .send({
//             name: 'Admin',
//             email: 'admin@mail.com',
//             password: generatePassword('123456'),
//             role: 'teacher',
//             address: 'jakarta',
//             position: '[-6.200000, 106.816666]',
//             telpon_number: '8123456789',
//             subjects: ['Mathematics', 'Chemistry'],
//             background: 'Universitas ABC, S1 Mathematics',
//             price: ''
//         })
//         .then(response => {
//             const { body, status } = response
//             expect(status).toEqual(400)
//             expect(body).toHaveProperty("message", "price can not be empty")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('test GET /teachers', () => {
//     it('test get teachers sukses', done => {
//         request(app)
//         .get('/teachers')
//         .then(response => {
//             const {body, status} = response
//             expect(status).toEqual(200);
//             expect(body[0]).toHaveProperty("name", expect.anything());
//             expect(body[0]).toHaveProperty("email", expect.anything());
//             expect(body[0]).toHaveProperty("role", expect.anything());
//             expect(body[0]).toHaveProperty("address", expect.anything());
//             expect(body[0]).toHaveProperty("position", expect.anything());
//             expect(body[0]).toHaveProperty("telpon_number", expect.anything());
//             expect(body[0]).toHaveProperty("subjects", expect.anything());
//             expect(body[0]).toHaveProperty("background", expect.anything());
//             expect(body[0]).toHaveProperty("price", expect.any(Number));
//             done();
//         })
//         .catch(err => {
//             console.log(err)
//             done(err)
//         })
//     })

//     // describe('Test Endpoint PUT /teachers/:id', () => {
//     //     // Success edit product
//     //     it('Test edit product sukses', done => {
//     //       request(app)
//     //         .put(`/teachers/${number}`)
//     //         .send({
//     //             name: 'Admin',
//     //             email: 'admin@mail.com',
//     //             password: generatePassword('123456'),
//     //             role: 'teacher',
//     //             address: 'jakarta',
//     //             position: '[-6.200000, 106.816666]',
//     //             telpon_number: '8123456789',
//     //             subjects: ['Mathematics', 'Chemistry'],
//     //             background: 'Universitas ABC, S1 Mathematics',
//     //             price: 21000000
//     //         })
//     //         .then(response => {
//     //           const { body, status } = response;
      
//     //           expect(status).toEqual(200);
//     //           expect(body[0]).toHaveProperty("id", expect.any(Number));
//     //           expect(body[0]).toHaveProperty("name", "Admin");
//     //           expect(body[0]).toHaveProperty("email", "admin@mail.com");
//     //           expect(body[0]).toHaveProperty("password", "123456");
//     //           expect(body[0]).toHaveProperty("role", "teacher");
//     //           expect(body[0]).toHaveProperty("address", "jakarta");
//     //           expect(body[0]).toHaveProperty("position", "[-6.200000, 106.816666]");
//     //           expect(body[0]).toHaveProperty("telpon_number", "8123456789");
//     //           expect(body[0]).toHaveProperty("subjects", ["Mathematics", "Chemistry"]);
//     //           expect(body[0]).toHaveProperty("background", "Universitas ABC, S1 Mathematics");
//     //           expect(body[0]).toHaveProperty("price", 21000000);
//     //           done();
//     //         })
//     //         .catch(err => {
//     //           done(err);
//     //         })
//     //     })
//     // })
// })
