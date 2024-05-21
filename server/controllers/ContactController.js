const Contact = require('../models/Contact');
const {isEmail} = require('validator');

exports.insertContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (name.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is Invalid' });
    }

    if (subject.length >= 100) {
      return res.status(400).json({ error: 'Subject is too long.' });
    }

    if (message.length >= 500) {
      return res.status(400).json({ error: 'Message is too long.' });
    }

    const newMessage = new Contact({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



exports.getContactMessage = async (req, res) => {
  try {
    const messages = await Contact.find();

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}