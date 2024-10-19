const express = require("express");
const router = express.Router();
const postcontroller =  require("../contollers/userscontrolleer");


router.get("",postcontroller.getAllPosts);
router.post("",postcontroller.createUser);
router.put("/:id",postcontroller.updateUser)
router.delete("/:id",postcontroller.deleteUser)
router.get("/:id",postcontroller.getById)
module.exports = router;