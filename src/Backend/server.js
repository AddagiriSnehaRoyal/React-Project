const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./Connectdb');
const User = require("./UserSchema");
const path = require('path');
const studentRoutes = require('./routes/students');
const errorHandler = require("./middleware/errorHandler");
const multer = require("multer"); 
const morgan = require("morgan");
const User1 = require("./models/User");
require("dotenv").config();

app.use(morgan("combined"));
app.use("/api/students", studentRoutes);
app.use(errorHandler);

connectDB();

// MIDDLEWARES
app.use(cors());            // Allow frontend to access backend
app.use(express.json());    // Enable JSON body parsing
app.use(express.urlencoded({ extended: true }));

// app.use('/api/courses', require('./routes/courses'));
// app.use('/api/events', require('./routes/events'));
// app.use('/api/notices', require('./routes/notices'));


app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/admission.routes"));
app.use("/api", require("./routes/counseling.routes"));
app.use("/api", require("./routes/events.routes"));
app.use("/api", require("./routes/notice.routes"));

app.get("/", (req, res) => {
  res.send("Backend is running successfully ");
});

// POST ROUTE
app.post("/add-user", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            phone,
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



app.post("/create-admin", async (req, res) => {
  const user = new User({
    name: "Admin",
    email: "admin@test.com",
    password: "12345678",
    phone: "9999999999",   
    role: "Admin"
  });

  await user.save();
  res.json({ message: "Admin created successfully" });
});


// SERVER
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});