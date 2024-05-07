const User = require("../models/User");
const BlogKeywords = require("../models/BlogKeywords")
const Blog = require("../models/Blog");

exports.userApproved = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    let { userId, isApproved } = req.body;

    try {

        await User.updateOne(
            { _id: userId },
            {
                isApproved: isApproved,
                updatedAt: Date.now(),  
            }
        );

        res.status(201).json({
            message: "User approval status update successfully!",
        });
    } catch (error) {
        res.status(400).json({
            error_code: "User cannot approved!",
            message: "Error" + error,
        });
    }
};


exports.blogStatus = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    
    try {
        const { blogId, status, method } = req.body;

        if (!blogId || typeof status === 'undefined' || typeof status !== 'boolean' || !method) {
            return res.status(400).json({
                error_code: "Invalid Data",
                message: "Status cannot update due to some reasons!",
            });
        }

        if (method === "show") {
            await Blog.updateOne(
                { _id: blogId },
                {
                    isShow: status,
                    updatedAt: Date.now(),  
                }
            );
            res.status(201).json({
                message: `Method: Show, Status: ${status}`,
            });
        } else if (method === "approval") {
            await Blog.updateOne(
                { _id: blogId },
                {
                    isApproved: status,
                    updatedAt: Date.now(),  
                }
            );
            res.status(201).json({
                message: `Method: Approval, Status: ${status}`,
            });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog cannot approved!",
            message: "Error" + error,
        });
    }
};



exports.updateUserRole = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    let { userId, newRole } = req.body;

    try {
        if (!userId || !newRole) {
            return res.status(400).json({
                error_code: "Invalid Data",
                message: "Some required fields are missing!",
            });
        }

        await User.updateOne(
            { _id: userId },
            {
                role: newRole,
                updatedAt: Date.now(),  
            }
        );

        res.status(201).json({
            message: "User role update successfully!",
        });
    } catch (error) {
        res.status(400).json({
            error_code: "User cannot approved!",
            message: "Error" + error,
        });
    }
};


exports.getBlogKeywords = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}

    try {
        const keywords = await BlogKeywords.find();

        if (!keywords) {
            return res.status(400).json({message: "There is no blogs keywords",});
        }

        res.status(201).json(keywords);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Keyword getting error!",
            message: "Error" + error,
        });
    }
};


exports.deleteBlogKeyword = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    const { id } = req.body;
    try {
        await BlogKeywords.deleteOne({ _id: id });

        res.status(201).json({
            message: "Keyword deleted successfully!",
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Keyword cannot deleted!",
            message: "Error" + error,
        });
    }
};


exports.addBlogKeywords = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    const { keyword } = req.body;

    try {
        const isKeywordExist = await BlogKeywords.findOne({ keyword: keyword });

        if (isKeywordExist) {
            return res.status(400).json({message: "Keyword already exist",});
        }

        const newKeyword = new BlogKeywords({
            keyword: keyword,
        });

        await newKeyword.save();

        res.status(201).json({
            message: "Keyword save successfully!",
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Blog Keyword cannot saved!",
            message: "Error" + error,
        });
    }
};