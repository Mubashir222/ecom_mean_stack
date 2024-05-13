const express = require('express');
const router = express.Router();
const dropdownOptionDataController = require('../controllers/DropdownOptionDataController');

router.post('/add', dropdownOptionDataController.addOptionData);
router.get('/getAll', dropdownOptionDataController.getAllOptionData);
router.get('/get', dropdownOptionDataController.getOptionAllData);
router.get('/getOne', dropdownOptionDataController.getOptionData);
router.patch('/update', dropdownOptionDataController.updateOptionData);
router.delete('/delete/:id', dropdownOptionDataController.deleteOptionData);


router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;