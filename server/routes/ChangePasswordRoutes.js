const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/changePasswordController');

router.post('/forgot-password-request', passwordController.userForgotPasswordEmailSend);
router.put('/reset-forgot-password', passwordController.userResetPassword);
router.put('/change-password', passwordController.userChangePassword);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed!' });
});

module.exports = router;
