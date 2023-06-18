import {Router} from 'express'
import { userController } from '../Controller/UserController'
//import route from './commentRoute'
const router:Router = Router()
router.post('/create', userController.createUser )
router.post('/login',userController.loginUser )
router.post('/login/admin', userController.loginAdmin)
router.post('/create/admin', userController.createAdmin)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/edit/:id', userController.updateUser)
router.delete('/remove/:id', userController.removeUser)

export default router
