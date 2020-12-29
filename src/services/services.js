const { request } = require("express");
const sqlLiteManager = require("../models/sqlLiteManager");

const publicMethods = {
  sample: (req, res) => {
    sqlLiteManager.connect();
    res.json({ message: "hello" });
  },

  authentication: (req, res) => {
    sqlLiteManager.connect();
    let username = req.body.username;
    let password = req.body.password;
    if(username && password){
      sqlLiteManager.insert(username,password);

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
