const sqlLiteManager = require("../models/sqlLiteManager");

const publicMethods = {
  sample: (req, res) => {
    sqlLiteManager.connect();
    res.json({ message: "hello" });
  },

  authentication: (req, res) => {
    sqlLiteManager.connect();
    res.json({ message: "hello" });
  },

  getDraws: (req, res) => {
    res.json({ message: "hello" });
  },
};

module.exports = publicMethods;
