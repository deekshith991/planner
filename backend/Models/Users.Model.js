const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['student', 'professor'], required: true },
  UserId: { type: String, required: true, unique: true },
  profile: { type: profileSchema, required: true },
  branches: {
    type: [String],
    enum: ['EEE', 'ECE', 'CSE', 'MECH', 'CIVIL', 'CHEM', 'MME'],
    required: false // Only applicable for students
  },
  department: {
    type: String,
    enum: ['Telugu', 'English', 'Maths', 'Physics', 'Chemistry', 'Sanskrit'],
    required: false // Only applicable for professors
  },
  BatchYear: { type: Number, required: false }, // Only applicable for students
  JoiningYear: { type: Number, required: false } // Only applicable for professors
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

