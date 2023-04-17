const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/userController");

const { validate, isValidId, validateBody } = require("../../middlewares");
const { addUser, followUser, userData } = require("../../models/user");
const router = express.Router();

router.post("/add", validate(addUser), ctrlWrapper(ctrl.addUserData));

router.post("/", ctrlWrapper(ctrl.getUsers));

router.post("/follower", ctrlWrapper(ctrl.getFollower));

router.post("/update", validateBody(followUser), ctrlWrapper(ctrl.updateUser));

module.exports = router;
