const bcrypt = require('bcryptjs');
const authModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) { // FIX 1: Removed strict username requirement
            return res.status(400).json({ message: 'Email and password required' });
        }

        const securePassword = await bcrypt.hash(password, 10);
        const userEmail = await authModel.findOne({ email });

        if (userEmail) {
            return res.status(409).json({ message: 'User Already Exists' });
        }

        const finalUsername = username || email.split('@')[0]; 

        const newUser = await authModel.create({ username: finalUsername, email, password: securePassword });
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(201).json({
            message: 'User Registered Successfully',
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({ message: 'error while registering user' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'all fields required' });
        }

        const user = await authModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'Wrong ID PASSWORD' });
        }

        const isVaildPassword = await bcrypt.compare(password, user.password);

        if (!isVaildPassword) {
            return res.status(401).json({ message: 'Wrong ID PASSWORD' });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        
        return res.status(200).json({ message: 'Login Successful', user });

    } catch (error) {
        return res.status(500).json({ message: 'Error While Login' });
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,       
            sameSite: "none"  
        }).json({ message: "Logged out successfully!" });
    } catch (error) {
         return res.status(500).json({ message: 'Error While Logout' });
    }
}

module.exports = { registerUser, loginUser, logoutUser };
