const jwt = require('jsonwebtoken');

function GenerateToken(user) {
    // const payload = {
    //     email,
    //     exp: Math.floor(Date.now() / 1000) + expirationTimeInMinutes * 60,
    // };

    // const token = jwt.sign(payload, process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id, myEmail: user.email, }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token
}

function VerifyToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
        console.error('Error verifying token:', error);
		return null;
	}
}

module.exports = { GenerateToken, VerifyToken };