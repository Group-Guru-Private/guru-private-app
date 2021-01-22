const router = require('express').Router()
const TeacherController = require('../controllers/teacherController')

router.get('/', TeacherController.findAll)
router.put('/:id', TeacherController.editProfile)
router.post('/login', TeacherController.login)
router.post('/register', TeacherController.register)

module.exports = router