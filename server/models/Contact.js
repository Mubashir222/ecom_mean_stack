const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
    },
    subject: { 
        type: String, 
        default: "", 
        maxlength: 100 
    },
    message: { 
        type: String, 
        default: "", 
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

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
