import User from "../../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check for all details
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "email not registered"
            });
        }

        // Compare password
        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "incorrect password"
                });
            }

            // Generate JWT token
            const tokenPayload = {
                id: user._id,
                email: user.email
            };

            const token = jwt.sign(
                tokenPayload,
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            // Set cookie options
            const cookieOptions = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure in production
                sameSite: 'strict' // Prevent CSRF attacks
            };

            // Set cookie and send response
            return res
                .cookie("userCookie", token, cookieOptions)
                .status(200)
                .json({
                    success: true,
                    message: "Login successful",
                    user: {
                        id: user.id,
                        email: user.email
                    }
                });

        } catch (bcryptError) {
            console.error("Password comparison error:", bcryptError);
            return res.status(500).json({
                success: false,
                message: "Internal server error during authentication"
            });
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default login;