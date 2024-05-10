const mongoose = require('mongoose');

const dropdownOptionSchema = new mongoose.Schema({
    option: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});  

const DropdownOption = mongoose.model('DropDownOptions', dropdownOptionSchema);

module.exports = DropdownOption;
