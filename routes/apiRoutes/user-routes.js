const router = require('express').Router();

const { getAllUser, getUserById, createUser, addFriend, removeFriend, updateUser, deleteUser } = require('../../controllers/user-controller');

//route for /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

//route for /api/users/:id parameter
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//route for /api/users/:userId/friends/:friendId with userId and freindId being parameters
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;