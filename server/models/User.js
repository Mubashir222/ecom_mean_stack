const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    religion: { type: String, default: ""},
    phoneNo: { type: String, default: "" },
    profileImg: { type: String, default: "/assets/images/8380015.jpg" },
    description: { type: String, default: "No description provided", maxlength: 500 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
