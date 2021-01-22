const StudentController = require('../controllers/studentController')
const router = require('express').Router()
const authStudent = require('../middleware/authStudent')


router.get('/', StudentController.showAll)
router.post('/register', StudentController.register)
router.post('/login', StudentController.login)

router.get('/:id', StudentController.getStudentbyId)
router.use(authStudent)
router.put('/edit/:id', StudentController.update)




module.exports = router