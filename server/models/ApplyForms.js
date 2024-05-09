const mongoose = require('mongoose');

const ApplyFormSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    religion: { type: String, default: "" },
    company: { type: String, default: ""},
    websiteUrl: { type: String, default: "/uploads/default-profile.jpg" },
    phoneNo: { type: String, default: "0300XXXXXXX"},
    gender: { type: String, default: "male" },
    profileImg: { type: String, default: "/uploads/default-profile.jpg" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ApplyForms = mongoose.model('ApplyFormUserDetail', ApplyFormSchema);

module.exports = ApplyForms;
