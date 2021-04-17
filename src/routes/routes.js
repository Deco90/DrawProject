var express = require("express");
const router = express.Router();
const services = require("../services/services");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/sample", services.sample);
router.post("/login", services.login);
router.post("/signup", services.signup);
router.post("/upload", services.upload);
router.post("/history", services.history);

module.exports = router;
