const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    blogImg: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    isShow: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});  

blogSchema.index({ userId: 1 });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
