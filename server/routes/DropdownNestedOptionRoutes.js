const express = require('express');
const router = express.Router();
const dropdownNestedOptionController = require('../controllers/DropdownNestedOptionController');

router.post('/add', dropdownNestedOptionController.addOptionData);
router.get('/getAll', dropdownNestedOptionController.getAllOptionData);
router.get('/get', dropdownNestedOptionController.getOptionAllData);
router.get('/getOne', dropdownNestedOptionController.getOptionData);
router.patch('/update', dropdownNestedOptionController.updateOptionData);
router.delete('/delete/:id', dropdownNestedOptionController.deleteOptionData);


router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;