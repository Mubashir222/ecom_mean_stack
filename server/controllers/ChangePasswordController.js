const { isEmail } = require("validator");
const User = require("../models/User");
const ForgotPasswordOtp = require("../models/ForgotPassword");
const { ChangePasswordEmail } = require("../common/ForgotPasswordEmail");
const bcrypt = require("bcrypt");
const {GenerateOTP} = require("../common/GenerateOtp"); 

exports.userForgotPasswordEmailSend = async (req, res) => {
    let { email } = req.body;
    try {
        if (!isEmail(email)) {
            return res.status(422).json({
                message: "Email should be a valid email address",
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            const otp = GenerateOTP();

            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 30);

            await ForgotPasswordOtp.create({
                email,
                otp,
                expiration_time: expirationTime,
                used: false,
            });

            ChangePasswordEmail(user, otp);

            res.status(200).json({
                message: "Please check your email for the OTP.",
            });
        } else {
            res.status(422).json({
                message:
                    "Email does not exist! Try correct email.",
            });
        }
    } catch (error) {
        res.status(400).json({
            error_code: "confirm_email",
            message: error.message,
        });
    }
};

exports.userResetPassword = async (req, res) => {
    let { email, user } = req.body;

    try {
        const { otp, password, confirmPassword } = user;

        if (password !== confirmPassword) {
            return res.status(422).json({ message: "Password and confirm password do not match" });
        }

        // Extract email from the request body or session, depending on your setup
        const extractedEmail = email;

        if (!extractedEmail) {
            return res.status(422).json({
                message: "Email is missing from the request",
            });
        }

        // Find the user based on the extracted email
        const myUser = await User.findOne({ email: extractedEmail });

        if (!myUser) {
            return res.status(422).json({ message: "Email is incorrect" });
        }

        // Find the OTP document based on the email and OTP value
        const resetOTP = await ForgotPasswordOtp.findOne({ email: extractedEmail, otp });

        if (!resetOTP) {
            return res.status(422).json({ message: "Email or OTP is incorrect!" });
        }

        // Check if the OTP is expired
        if (resetOTP.expiration_time < new Date()) {
            return res.status(422).json({ message: "OTP has expired!" });
        }

        // Check if the OTP has already been used
        if (resetOTP.used === true) {
            return res.status(422).json({ message: "OTP is already used!" });
        }

        // Hash the new password
        const passwordHash = await bcrypt.hash(password, 10);

        // Update the user's password and mark the OTP as used
        await User.updateOne(
            { _id: myUser._id },
            {
                password: passwordHash,
                updatedAt: Date.now(),  
            }
        );

        await ForgotPasswordOtp.updateOne(
            { email: extractedEmail, otp },
            { used: true }
        );

        res.status(201).json({
            message: "Password Reset Successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error_code: "password_reset",
            message: "error" + error,
        });
    }
};


exports.userChangePassword = async (req, res) => {
    if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No authorization token" });
	}
    let { userData, email } = req.body;

    try {
        const { oldPassword, newPassword, confirmPassword } = userData;

        if (newPassword !== confirmPassword) {
            return res.status(422).json({ message: "Password and confirm password do not match" });
        }

        const myUser = await User.findOne({ email });

        if (!myUser) {
            return res.status(422).json({ message: "Email is incorrect" });
        }
        
        const isPasswordValid = await bcrypt.compare(oldPassword, myUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Old Password is not corrected!' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await User.updateOne(
            { _id: myUser._id },
            {
                password: passwordHash,
                updatedAt: Date.now(),  
            }
        );

        res.status(201).json({
            message: "Password Change Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error_code: "Change password error",
            message: "Error" + error,
        });
    }
};
