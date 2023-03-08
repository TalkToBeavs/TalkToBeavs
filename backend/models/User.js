import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
