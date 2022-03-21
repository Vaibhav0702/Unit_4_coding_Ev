const mongoose = require("mongoose");

// userSchema

const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: false },
      age: { type: Number, required: true },
      email: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  const User = mongoose.model("user", userSchema);
  
  module.exports = User;