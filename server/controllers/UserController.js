const User = require('../models/User');
const bcrypt = require('bcrypt');
const isEmail = require("validator/lib/isEmail")
const jwt = require("jsonwebtoken")
const { VerifyToken, GenerateToken } = require("../common/GenerateDecodeToken")

exports.GetUser = async (req, res) => {
  if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decodedToken;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.GetAllUser = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is Invalid' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isEmail(email)) {
			return res
				.status(422)
				.json({ message: "Email should be a valid email address" });
		}

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: 'User account does not exist!' });
    }

    if(user.isApproved === false) {
      return res.status(400).json({ error: 'Account is not approved by Admin!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Password is not corrected!' });
    }

    const token = GenerateToken(user);
    
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ Error: 'Internal Server Error' });
  }
};


exports.DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user account' });
    }
};



exports.userUpdate = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No authorization token" });
  }
  const token = req.headers.authorization;

  const {userData} = req.body;
  try {
    if (!userData) {
      return res.status(400).json({ error: "No Data is updated" });
    }

    const tokenData = VerifyToken(token);

    if (!tokenData) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    const {userId, myEmail} = tokenData;

    const { username, profileImg, email, description } = userData;

    if (!username || !email || !profileImg || !description) {
      return res.status(400).json({ error: "Some data is missing!" });
    }

    if (email != myEmail) {
      const user = await User.findOne({email});

      if (user) {
        return res.status(404).json({ error: "This email is already used!" });
      }
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is Invalid' });
    }

    await User.updateOne(
        { _id: userId },
        {
            username: username,
            email: email,
            profileImg: profileImg,
            description: description,
            updatedAt: Date.now(),  
        }
    );

     res.status(201).json({
       message: "User Updated Successfully!",
     });
   } catch (error) {
     console.error('Error uploading image:', error);
     res.status(500).json({
       error: "Internal Server Error"
     });
   }
 };
