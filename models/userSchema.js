import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //to remove whitespaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number, // we can assign it with boolean also
      default: 0, //0 means false 1 means true..........0 means employee or 1 means admin
    },
  },
  { timestamps: true }
); //timestamps true means jab bhi new user add hoga ye uska time jab wo add hua wo add krdega

export default mongoose.model("users", userSchema);
