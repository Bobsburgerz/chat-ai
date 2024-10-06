const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  customer: { type: String },
  premium: { type: Boolean, default: false},
  confirmation: {type: String},
  credits: {type: Number, default: 0}
});

const User = mongoose.models.User|| mongoose.model('User', UserSchema);
 
export default User;