const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');

router.post('/insertContact', contactController.insertContactMessage);
router.get('/getContact', contactController.getContactMessage);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
