const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const counselingSchema = new mongoose.Schema({
  // Personal Details (Required)
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  number: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^\d{10}$/, 'Phone must be 10 digits']
  },
  phone: {
  type: String,
  required: [true, "Phone is required"],
},
  
  // Academic Details (Required)
  currentClass: {
    type: String,
    required: [true, 'Current class is required'],
    enum: {
      values: ['10th', '11th', '12th', 'Graduation', 'Post-Graduation'],
      message: 'Invalid class selection'
    }
  },
  
  // Course Details (Required)
  course: {
    type: String,
    required: [true, 'Course selection is required'],
    enum: {
      values: [
        'B.Tech CS', 'B.Tech ECE', 'MBA Marketing', 'MBA Finance',
        'Data Science', 'Psychology', 'Medicine', 'Law'
      ],
      message: 'Invalid course selection'
    }
  },
  
  parentPhone: {
    type: String,
    required: [true, 'Parent phone is required'],
    match: [/^\d{10}$/, 'Parent phone must be 10 digits']
  },

  // Optional Academic Fields
  class10: {
    type: Number,
    min: [0, 'Class 10% cannot be negative'],
    max: [100, 'Class 10% cannot exceed 100']
  },
  class12: {
    type: Number,
    min: [0, 'Class 12% cannot be negative'],
    max: [100, 'Class 12% cannot exceed 100']
  },
  board: {
    type: String,
    enum: ['CBSE', 'ICSE', 'State Board', 'IB', 'Other', ''],
    default: ''
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', ''],
    default: ''
  },

  // Optional Preferences
  location: {
    type: String,
    enum: ['Local', 'Karnataka', 'Other States', 'Abroad', ''],
    default: ''
  },
  budget: {
    type: String,
    enum: ['Under 5L', '5-10L', '10-20L', '20L+', ''],
    default: ''
  },
  entranceExam: {
    type: String,
    maxlength: [200, 'Entrance exams cannot exceed 200 characters'],
    default: ''
  },
  counselingPreference: {
    type: String,
    enum: ['Online', 'Offline', 'Phone', ''],
    default: ''
  },
  parentName: {
    type: String,
    maxlength: [100, 'Parent name cannot exceed 100 characters'],
    default: ''
  },

  // Optional Message
  message: {
    type: String,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    default: ''
  },

  // Auto-generated fields
  date: {
    type: String,
    default: () => new Date().toLocaleDateString()
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for fast queries
counselingSchema.index({ email: 1 });
counselingSchema.index({ phone: 1 });
counselingSchema.index({ status: 1 });
counselingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Counseling', counselingSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    unique: true,
    match: [/^\d{10}$/, 'Phone must be exactly 10 digits']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  class10: {
    type: Number,
    min: [0, 'Class 10% cannot be negative'],
    max: [100, 'Class 10% cannot exceed 100']
  },
  class12: {
    type: Number,
    min: [0, 'Class 12% cannot be negative'],
    max: [100, 'Class 12% cannot exceed 100']
  },
  userType: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  termsAccepted: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Indexes for fast queries
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ userType: 1 });

module.exports = mongoose.model('User', userSchema); 