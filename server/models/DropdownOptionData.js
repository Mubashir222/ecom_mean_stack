const mongoose = require('mongoose');

const dropdownOptionDataSchema = new mongoose.Schema({
    dropdownOptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'DropDownOptions', index: true },
    data: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});  

DropdownOptionData.index({ dropdownOptionId: 1 });

const DropdownOptionData = mongoose.model('DropDownOptionData', dropdownOptionDataSchema);

module.exports = DropdownOptionData;
