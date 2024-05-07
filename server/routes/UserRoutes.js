const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Route to get all users
router.get('/getUser', userController.GetUser);
router.get('/getAllUser', userController.GetAllUser);
router.post('/signup', userController.Signup);
router.post('/login', userController.Login);
router.delete('/deleteUser/:id', userController.DeleteUser);
router.put('/user-update', userController.userUpdate);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
