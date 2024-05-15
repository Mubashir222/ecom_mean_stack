const mongoose = require('mongoose');

const dropdownNestedOptionSchema = new mongoose.Schema({
    optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'DropDownOptions', index: true },
    data: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});  

dropdownNestedOptionSchema.index({ optionId: 1 });

const DropdownNestedOption = mongoose.model('DropdownNestedOption', dropdownNestedOptionSchema);

module.exports = DropdownNestedOption;
