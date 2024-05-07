const Blog = require("../models/Blog");
const BlogKeywords = require("../models/BlogKeywords")
const Slugify = require("../utils/Slugify");

exports.addBlog = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    const { blogData, detail, userId, role } = req.body;

    try {
        const { blogTitle, blogImg, description, keyword } = blogData;

        if (!blogTitle || !blogImg || !description || !keyword || !detail || !userId || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (description.length > 200) {
            return res.status(400).json({ message: "Description cannot exceed 200 characters." });
        }

        const blogExist = await Blog.findOne({ title: blogTitle });

        if (blogExist) {
            return res.status(400).json({ message: "Blog already exists" });
        }

        const userRole = role==="admin" ? "admin" : "user";
        const isApproved = userRole === "admin" ? true : false;

        const slug = Slugify(blogTitle);
        
        const blog = new Blog({
            title: blogTitle,
            slug: slug,
            category: keyword,
            blogImg: blogImg,
            description: description,
            detail: detail,
            userId: userId,
            isApproved: isApproved,
        });

        await blog.save();

        res.status(201).json({
            message: "Blog created successfully!",
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog cannot stored!",
            message: "Error" + error,
        });
    }
};


exports.getAllBlogs = async (req, res) => {
    try {
        // const blogs = await Blog.find().populate('userId');
        const blogs = await Blog.find().populate({
            path: 'userId',
            select: 'username email role description profileImg'
        });

        if (blogs.length === 0) {
            return res.status(400).json({ message: "There is no Blog exists" });
        }

        res.status(201).json(blogs);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog cannot get!",
            message: "Error" + error,
        });
    }
};


exports.getTopBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('userId');

        if (blogs.length === 0) {
            return res.status(400).json({ message: "There is no Blog exists" });
        }

        res.status(201).json(blogs);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog cannot get!",
            message: "Error" + error,
        });
    }
};



exports.getBlog = async (req, res) => {
    const { slug } = req.params;

    try {
        const blog = await Blog.findOne({slug: slug}).populate('userId');

        if (!blog) {
            return res.status(400).json({ message: "There is no Blog exists" });
        }

        res.status(201).json(blog);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog cannot get!",
            message: "Error" + error,
        });
    }
};


exports.getAllBlogKeywords = async (req, res) => {
    try {
        const keywords = await BlogKeywords.find();

        if (keywords.length === 0) {
            return res.status(400).json({ message: "There is no Blog exists" });
        }

        res.status(201).json(keywords);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog cannot get!",
            message: "Error" + error,
        });
    }
};