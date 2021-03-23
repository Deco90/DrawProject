const { request } = require("express");
const sqlLiteManager = require("../models/sqlLiteManager");

const publicMethods = {
  sample: (req, res) => {
    sqlLiteManager.connect();
    sqlLiteManager.read();
    res.json({ message: "hello" });
  },

  signup: (req, res) => {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let userName = req.body.userName;
    let userGender = req.body.userGender;
    let password = req.body.userPassword;
    if (fullName && email && userName && userGender && password) {
      sqlLiteManager.insert(fullName, email, userName, userGender, password);
      res.json({ message: "succedd signup" });
    }
  },

  login: async (req, res) => {
    let username = req.body.userName;
    let password = req.body.userPassword;
    if (username && password) {
      let auth = await sqlLiteManager.auth(username, password);
      if (auth) {
        res.json(auth);
      } else {
        res.json({ message: "user name or password isn't correct" });
      }
    }
  },

  upload: (req, res) => {
    let userId = req.body.userid; //check about pass from localstorage - do after login
    let filePath = req.body.filePath;
    let bbResult = req.body.bbResult;
    let dateOfBirth = req.body.dateOfBirth;
    let gender = req.body.gender;
    let fullNameOfChild = req.body.fullNameOfChild;
    let dateUpload = req.body.dateUpload;
    if (userId && filePath && dateUpload) {
      console.log("check");
      res.json({ message: "hello" });

      // res.json({ message: "ready upload" });

      // let getMedia = await sqlLiteManager.upload(
      //   userId,
      //   drawId,
      //   filePath,
      //   bbResult,
      //   dateOfBirth,
      //   gender,
      //   fullNameOfChild
      // );
    }
  },

  getDraws: (req, res) => {
    res.json({ message: "hello" });
  },
};

module.exports = publicMethods;
