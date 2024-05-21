const express = require('express');
const router = express.Router();
const multiFilesController = require('../controllers/MultiFilesController');

router.post('/upload-multi-files', multiFilesController.uploadmultiFiles);
router.get('/get-files', multiFilesController.getFiles);
router.delete('/delete-file/:id', multiFilesController.deleteFile);
router.get('/download/:id', multiFilesController.downloadFiles);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
