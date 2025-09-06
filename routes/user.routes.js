const express = require('express');
const { registerUser, loginUser, profile } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, profile);


module.exports = router;
