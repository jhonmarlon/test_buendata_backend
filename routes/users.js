const {Router} = require("express");
const {getUsers, getUserById, postUser, deleteUser, patchUser} = require("../controllers/users");

const router = Router();

//GET all users
router.get('/', getUsers);

//GET user by id
router.get('/:id', getUserById);

//POST to create new user
router.post('/', postUser);

//DELETE to delete a user by id
router.delete('/:id', deleteUser);

//PATCH to update a user by id
router.patch('/:id', patchUser);


module.exports = router;