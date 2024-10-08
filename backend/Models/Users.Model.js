const mongoose = require('mongoose');

// Define the available branches and departments as arrays
const availableBranches = ['EEE', 'CSE', 'ECE', 'MECH', 'CIVIL', 'MME', 'CHEM'];
const availableDepartments = ['Telugu', 'English', 'Maths', 'Physics'];

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
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  batchYear: {
    type: Number,
    required: function () {
      return this.role === 'student'; // Only required for students
    },
  },
  branch: {
    type: String,
    enum: availableBranches,
    required: function () {
      return this.role === 'student'; // Only required for students
    },
  },
  department: {
    type: String,
    enum: availableDepartments, // Validating against the available departments
    required: function () {
      return this.role === 'professor'; // Only required for professors
    },
  },
  branches: [{
    type: String,
    enum: availableBranches, // Validating against the available branches
  }], // Array of branches or subjects taught by professors
});

// Pre-save hook to generate userId for students
UserSchema.pre('save', async function (next) {
  if (this.role === 'student') {
    const yearSuffix = (this.batchYear % 100).toString().padStart(2, '0'); // Get last two digits of the batch year
    const studentCount = await this.model('User').countDocuments({ role: 'student', batchYear: this.batchYear }); // Count existing students for the batch year
    const studentIdSuffix = (studentCount + 1).toString().padStart(4, '0'); // Generate ID suffix starting from 0001
    this.userId = `B${yearSuffix}${studentIdSuffix}`; // Set userId in the format BYYXXXX
  }
  next();
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);

