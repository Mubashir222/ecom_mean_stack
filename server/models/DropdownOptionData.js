const mongoose = require('mongoose');

const dropdownOptionDataSchema = new mongoose.Schema({
    optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'DropDownOptions', index: true },
    data: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});  

dropdownOptionDataSchema.index({ optionId: 1 });

const DropdownOptionData = mongoose.model('DropdownOptionData', dropdownOptionDataSchema);

module.exports = DropdownOptionData;
