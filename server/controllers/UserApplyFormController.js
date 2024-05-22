const ApplyForm = require('../models/ApplyForms');
const bcrypt = require('bcrypt');
const isEmail = require("validator/lib/isEmail")

exports.insertUserInformation = async (req, res) => {
  try {
    const { firstname, lastname, email, company, religion, phoneNo, profileImg, websiteUrl, gender, password, confirmPassword } = req.body;

    if (firstname.length < 3) {
      return res.status(400).json({ error: 'First Name must be at least 3 characters long' });
    }
    if (lastname.length < 3) {
      return res.status(400).json({ error: 'Last Name must be at least 3 characters long' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is Invalid' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await ApplyForm.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords and Confirm Password does not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new ApplyForm({
        firstname,
        lastname,
        email,
        company,
        phoneNo,
        websiteUrl,
        password: hashedPassword,
        gender,
        religion,
        profileImg
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getUserDetail = async (req, res) => {
  try {
    const usersDetail = await ApplyForm.find();

    if (!usersDetail) {
      return res.status(404).json({ error: 'There no any users detail!' });
    }

    res.status(200).json(usersDetail);
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.updateProfileImg = async (req, res) => {
  try {
    const { profileImg } = req.body;
    const email = "mubashiriftikharkhan@gmail.com"
    const user = await ApplyForm.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profileImg = profileImg;
    await user.save();

    res.status(200).json({ message: 'Profile Image updated successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await ApplyForm.findById({_id: id});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await ApplyForm.deleteOne({_id: id});

    res.status(200).json({ message: 'User form deleted successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
