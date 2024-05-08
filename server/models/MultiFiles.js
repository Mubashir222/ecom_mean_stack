const mongoose = require('mongoose');

const multiFilesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'ApplyFormUserDetail', index: true },
    file: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});  

multiFilesSchema.index({ userId: 1 });

const MultiFiles = mongoose.model('MultiFiles', multiFilesSchema);

module.exports = MultiFiles;
