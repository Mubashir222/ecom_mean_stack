const User = require('../models/User');
const Blog = require('../models/Blog');

exports.GetUsersBlogs = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const blogsCount = await Blog.countDocuments();
    
    res.json({ users: usersCount, blogs: blogsCount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
