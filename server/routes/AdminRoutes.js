const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.put('/user-approved', adminController.userApproved);
router.patch('/blog-status', adminController.blogStatus);
router.put('/update-user-role', adminController.updateUserRole);
router.get('/get-blogKeywords', adminController.getBlogKeywords);
router.post('/add-blogKeywords', adminController.addBlogKeywords);
router.delete('/delete-blogKeywords', adminController.deleteBlogKeyword);

router.use((req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
