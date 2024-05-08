const express = require('express');
const router = express.Router();
const uploadImgController = require('../controllers/UploadImgController');

router.post('/upload-img', uploadImgController.uploadImg);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
