const User = require("../model/UsersModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    console.log("Signup request received:", req.body); // Debug log
    
    const { email, password, username, createdAt } = req.body;
    
    // Validate required fields
    if (!email || !password || !username) {
      return res.json({ 
        message: "All fields are required", 
        success: false 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ 
        message: "User already exists", 
        success: false 
      });
    }

    // Create new user
    const user = await User.create({ 
      email, 
      password, 
      username, 
      createdAt: createdAt || new Date() 
    });
    
    console.log("User created:", user); // Debug log

    // Create token
    const token = createSecretToken(user._id);
    
    // Set cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    // Send success response
    res.status(201).json({ 
      message: "User signed up successfully", 
      success: true, 
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
    
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false,
      error: error.message 
    });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    console.log("Login request received:", req.body); // Debug log
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ 
        message: 'All fields are required', 
        success: false 
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ 
        message: 'Incorrect password or email', 
        success: false 
      });
    }
    
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ 
        message: 'Incorrect password or email', 
        success: false 
      });
    }
    
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    res.status(200).json({ 
      message: "User logged in successfully", 
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false,
      error: error.message 
    });
  }
};