
const mongoose = require('mongoose');

// Define an enum for Account Types and Branches/Departments
const AccountTypeEnum = ['Student', 'Professor'];
const BranchEnum = ['EEE', 'ECE', 'MECH', 'CSE', 'CIVIL'];
const DepartmentEnum = ['Telugu', 'English', 'Maths', 'Physics'];

const userSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[B|P](15|16|17|18|19|20|21|22|23|24)[0-9]{4}@rgukt\.ac\.in$/,
      'Invalid email format',
    ],
  },
  Password: {
    type: String,
    required: true,
  },
  AccountType: {
    type: String,
    enum: AccountTypeEnum, // Using the defined enum
    required: true,
  },
  Profile: {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
  },
  Branch: {
    type: String,
    enum: BranchEnum, // Using the defined enum
    required: function () {
      return this.AccountType === 'Student';
    },
  },
  Department: {
    type: String,
    enum: DepartmentEnum, // Using the defined enum
    required: function () {
      return this.AccountType === 'Professor';
    },
  },
  // Branches: {
  //   type: [String], // Array to hold multiple branches
  //   enum: BranchEnum, // Using the defined enum
  //   required: function () {
  //     return this.AccountType === 'Professor';
  //   },
  // },
  Branches: {
    type: [String],
    enum: BranchEnum,
    required: function () {
      return this.AccountType === 'Professor';
    },
    validate: {
      validator: function (value) {
        return this.AccountType === 'Professor' ? value.length > 0 : value.length === 0;
      },
      message: 'Branches field should only be set for Professors.',
    },
  },

});

// Optional: Pre-save hook to handle password encryption
// userSchema.pre('save', async function (next) {
//   if (this.isModified('Password')) {
//     this.Password = await bcrypt.hash(this.Password, 10); // Use bcrypt or any other method
//   }
//   next();
// });

const User = mongoose.model('Users', userSchema);

module.exports = User;

