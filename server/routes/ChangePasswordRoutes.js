const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/ChangePasswordController');

router.post('/forgot-password-request', passwordController.userForgotPasswordEmailSend);
router.put('/reset-forgot-password', passwordController.userResetPassword);
router.patch('/change-password', passwordController.userChangePassword);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed!' });
});

module.exports = router;
