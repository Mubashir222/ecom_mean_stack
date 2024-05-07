const mongoose = require('mongoose');

const BlogKeywordsSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
    },
    updatedAt: { 
        type: Date, 
        default: Date.now
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const BlogKeywords = mongoose.model('BlogKeywords', BlogKeywordsSchema);

module.exports = BlogKeywords;
