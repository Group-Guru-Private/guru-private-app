const router = require('express').Router()
const TeacherController = require('../controllers/teacherController')
const authTeacher = require('../middleware/authTeacher')

router.get('/',  TeacherController.findAll)
router.post('/register', TeacherController.register)
router.post('/login', TeacherController.login)
router.get('/:id', TeacherController.getTeacherById)
router.put('/:id', TeacherController.editProfile)

module.exports = router