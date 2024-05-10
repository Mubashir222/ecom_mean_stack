const express = require('express');
const router = express.Router();
const dropdownOptionController = require('../controllers/DropdownOptionController');

router.post('/add', dropdownOptionController.addOption);
router.get('/getAll', dropdownOptionController.getAllOption);
router.get('/get', dropdownOptionController.getOption);
router.put('/update', dropdownOptionController.updateOption);
router.delete('/delete/:id', dropdownOptionController.deleteOption);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;