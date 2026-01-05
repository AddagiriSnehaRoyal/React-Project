const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./Connectdb');
const User = require("./UserSchema");
const path = require('path');
const studentRoutes = require('./routes/students');


connectDB();

// MIDDLEWARES
app.use(cors());            // Allow frontend to access backend
app.use(express.json());    // Enable JSON body parsing
app.use(express.urlencoded({ extended: true }));

// POST ROUTE
app.post("/add-user", async (req, res) => {
    try {
        const { name, email, password, number } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            number,
        });

        await newUser.save();
        res.json({ message: "User registered successfully!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registering user" });
    }
});

app.get("/get-users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching users" });
    }
})

app.put("/update-user/:email", async (req, res) => {
    try {
        const userEmail = req.params.email;
        const updatedData = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            updatedData,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "User updated successfully!",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Error updating user" });
    }
});


app.delete("/delete-user/:email", async (req, res) => {
    try {
        const userEmail = req.params.email;

        const deletedUser = await User.findOneAndDelete({ email: userEmail });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User deleted successfully!",
            deletedUser,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting user" });
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/students', studentRoutes);

// Global Multer error handler (MUST be after routes)
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds 2MB limit'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Maximum 8 files allowed'
      });
    }
    return res.status(400).json({
      success: false,
      error: 'File upload error'
    });
  }

  if (error.message.includes('Only PDF')) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }

  // Other errors
  console.error('Upload error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});



// SERVER
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});