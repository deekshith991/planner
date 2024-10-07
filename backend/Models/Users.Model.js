const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'professor'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    department: { type: String } // specific to professors
  },
  studentId: {
    type: String,
    unique: true,
    match: /^B\d{6}$/,
    required: function () { return this.role === 'student'; }
  },
  professorId: {
    type: String,
    unique: true,
    match: /^T\d{6}$/,
    required: function () { return this.role === 'professor'; }
  },
  branches: [{ type: String }] // Array of branches or subjects taught by professors
});

module.exports = mongoose.model('User', UserSchema);
