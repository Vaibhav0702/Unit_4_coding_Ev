const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model")
const router = express.Router();


// ----------------userCRUD

router.get("", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.status(200).send({ user: users });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  // --------------
  
  router.post(
    "",
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 30 })
      .withMessage("length Must required min 3 & max 30"),
      body("lastName")
      .trim()
      .not()
      .isLength({ min: 3, max: 30 })
      .withMessage("length Must required min 3 & max 30"),
    body("age")
      .trim()
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("age must be a number between 1 to 150")
      .custom((val) => {
        if (val < 1 || val > 150) {
          throw new Error("incorrect age provided");
        } else {
          return true;
        }
      }),
    async (req, res) => {
      try {
        // -------
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // ------
  
        const users = await User.create(req.body);
  
        return res.status(200).send({ user: users });
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    }
  );
  
  
module.exports = router;