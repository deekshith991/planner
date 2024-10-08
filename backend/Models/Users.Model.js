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
    department: { type: String }, // specific to professors
  },
  batchYear: { type: Number, required: true },
  branch: { type: String, required: function () { return this.role === 'student'; } }, // Branch for students
  userId: { type: String, unique: true }, // Generated User ID
  professorId: { type: String, unique: true },
  branches: [{ type: String }] // Array of branches or subjects taught by professors
});

// Middleware to generate UserID before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const year = String(this.batchYear).slice(-2); // Get last two digits of batch year
    const prefix = `B${year}`;

    // Find the last student ID with the same prefix
    const lastUser = await this.constructor.findOne({ userId: { $regex: `^${prefix}` } }).sort({ userId: -1 });

    // Generate new sequential ID
    let newId;
    if (lastUser) {
      const lastNumber = parseInt(lastUser.userId.slice(-4), 10);
      newId = String(lastNumber + 1).padStart(4, '0'); // Increment the last number and pad with zeros
    } else {
      newId = '0001'; // Start from 0001 if no existing user
    }

    this.userId = `${prefix}${newId}`; // Set the generated User ID
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);

