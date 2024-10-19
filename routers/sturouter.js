const express = require("express")
const contoller = require("../contollers/stucontroller")
const validator = require("../validators/validation")
const router = express.Router();

router.post("",contoller.singUpStudent);
router.get("",validator.validateToken,contoller.getAllStudents);
router.post("/login",contoller.loginStudent);
router.get("/logout",contoller.logoutStudent);

module.exports = router;