const express = require("express");
const user = require("../controller/userController");
const router = express.Router();
// GET 
router.get("/", user.index);
router.get("/signUp", user.signUp);
router.get("/profile", user.profile);
router.get("/admin", user.list_user);
router.get("/edit", user.edit);
// POST
router.post("/join", user.post_user);
router.post("/login", user.post_login);
// PATCH
router.patch("/patch", user.patch_user);
// DELETE
router.delete("/delete", user.delete_user);

module.exports = router; 