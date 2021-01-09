const { request } = require("express");
const sqlLiteManager = require("../models/sqlLiteManager");

const publicMethods = {
  sample: (req, res) => {
    sqlLiteManager.connect();
    sqlLiteManager.read();
    res.json({ message: "hello" });
  },

  signup: (req, res) => {
    sqlLiteManager.connect();
    let userId = req.body.userId;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let userName = req.body.userName;
    let relationChild = req.body.relationChild;
    let password = req.body.userPassword;
    if (userId && fullName && email && userName && relationChild && password) {
      sqlLiteManager.insert(
        userId,
        fullName,
        email,
        userName,
        relationChild,
        password
      );
    }
  },

  login: async (req, res) => {
    sqlLiteManager.connect();
    let username = req.body.userName;
    let password = req.body.userPassword;
    if (username && password) {
      let auth = await sqlLiteManager.auth(username, password);
      if (auth) {
        res.json({ message: "succedd login" });
      } else {
        res.json({ message: "user name or password isn't correct" });
      }
    }
  },
  upload: (req, res) => {
    sqlLiteManager.connect();
    let drawId = req.body.drawId;
    let userId = req.body.userId;
    let filePath = req.body.filePath;
    let bbResult = req.body.bbResult;
    let dateOfBirth = req.body.dateOfBirth;
    let gender = req.body.gender;
    let fullNameOfChild = req.body.fullNameOfChild;
    let dateUpload = req.body.dateUpload;
    if (
      userId &&
      drawId &&
      filePath &&
      bbResult &&
      dateOfBirth &&
      gender &&
      fullNameOfChild &&
      dateUpload
    ) {
      sqlLiteManager.upload(
        userId,
        drawId,
        filePath,
        bbResult,
        dateOfBirth,
        gender,
        fullNameOfChild
      );
    }
  },

  getDraws: (req, res) => {
    res.json({ message: "hello" });
  },
};

module.exports = publicMethods;
