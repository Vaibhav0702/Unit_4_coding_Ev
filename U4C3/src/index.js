const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const userController =require("./controllers/user.controller")
const app = express();

app.use(express.json());

app.use("/users",userController);

// Schemas


// -----------------------------------
const bookSchema = new mongoose.Schema(
  {
    likes: { type: Number, required: true, default: 0 },
    coverImage: { type: String, required: true },
    content: { type: String, required: true },
    publication_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "publication",
        required : true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("book", bookSchema);

// -----------------------------

const publicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Publication = mongoose.model("publication", publicationSchema);

// -------------------------------

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    book_id :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : "book",
        required : true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = mongoose.model("comment", commentSchema);














module.exports = app;