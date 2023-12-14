const {Router} = require('express')
const router = Router()
const {getUsers, createUser, getUser, updateUser, deleteUser} = require('../controller/usersControllers')

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router
