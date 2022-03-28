const express = require("express");

// ----

const User = require("./models/user.models");
const Todo = require("./models/todo.models");
const {register} = require("./controller/auth.controller");

// -----

const userController = require("./controller/user.controller")


const app = express();
app.use(express.json());

app.use("/users",userController);
app.post("/register",register);


module.exports = app;