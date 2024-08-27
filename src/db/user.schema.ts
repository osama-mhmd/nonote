import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  hashedPassword: {
    type: String,
    require: true,
  },
  plan: {
    type: String,
    default: "basic",
  },
});

export default userSchema;
