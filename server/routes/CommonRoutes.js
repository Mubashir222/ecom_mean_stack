const express = require('express');
const router = express.Router();
const commonController = require('../controllers/CommonController');

router.get('/getUsersBlogs', commonController.GetUsersBlogs);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
