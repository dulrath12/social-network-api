const router = require('express').Router()

const { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController')
console.log(getUsers.toString())
router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router