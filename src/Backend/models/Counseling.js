const mongoose = require('mongoose');

const counselingSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^\d{10}$/, 'Phone must be 10 digits']
  },
  course: {
    type: String,
    required: [true, 'Course selection is required']
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  class10: String,
  class12: String,
  currentClass: {
    type: String,
    required: [true, 'Current class is required']
  },
  board: String,
  location: String,
  budget: String,
  entranceExam: String,
  stream: String,
  counselingPreference: String,
  parentName: String,
  parentPhone: {
    type: String,
    required: [true, 'Parent phone is required'],
    match: [/^\d{10}$/, 'Parent phone must be 10 digits']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Counseling', counselingSchema);
