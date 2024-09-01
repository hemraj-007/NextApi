import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
 
}, {
  timestamps: true 
});

// Check if the model is already compiled before defining it again
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
