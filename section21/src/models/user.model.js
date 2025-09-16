const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
  avatar: {
    type: {
      url: String,
      localPath: String,
    },
    default: {
      url: `https://placehold.co/200x200`,
      localPath: '',
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required (Custom)'],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String
  },
  forgotPasswordToken: {
    type: String
  },
  forgotPasswordTokenExpiry:{
    type: Date
  },
  emailVerificationToken:{
    type:String
  },
  emailVerificationTokenExpiry:{
    type:Date
  },
},{
    timestamps:true,
}
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
};

const users = mongoose.model("users",userSchema);



module.exports = users; 