const express = require('express');
const router = express.Router();
const userApplyFormController = require('../controllers/UserApplyFormController');

router.post('/user-apply-form', userApplyFormController.insertUserInformation);
router.get('/get-user-detail', userApplyFormController.getUserDetail);
router.put('/update-profile-img', userApplyFormController.updateProfileImg);
router.delete('/delete-form-user/:id', userApplyFormController.deleteUser);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
