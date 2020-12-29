const { request } = require("express");
const sqlLiteManager = require("../models/sqlLiteManager");

const publicMethods = {
  sample: (req, res) => {
    sqlLiteManager.connect();
    sqlLiteManager.read();
    res.json({ message: "hello" });
  },

  authentication: (req, res) => {
    sqlLiteManager.connect();
    let userId = req.body.userId;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let userName = req.body.userName;
    let relationChild = req.body.relationChild;
    if(userId && fullName && email && userName && relationChild){
      sqlLiteManager.insert(userId, fullName, email, userName, relationChild);

    }
  },

  signup: (req, res) => {
    sqlLiteManager.connect();
    let fullname = req.body.fullname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let validpassword = req.body.validpassword;
    let relation = req.body.relation
    if(username && password && validpassword && fullname && email && relation){

    }
  },
  getDraws: (req, res) => {
    res.json({ message: "hello" });
  },
};

module.exports = publicMethods;
