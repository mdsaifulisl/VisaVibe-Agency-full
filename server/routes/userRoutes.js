const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require('../middleware/authMiddleware');

router.post('/login', userController.loginUser);

router.get("/verify-me", protect, userController.getMe);

// dinamic folder setup middleware
const setUserFolder = (req, res, next) => {
  req.uploadFolder = "User_Image";
  next();
};

// Routes
router.post(
  "/",
  setUserFolder,
  upload.single("image"),
  userController.createUser,
);

router.put(
  "/:id",
  setUserFolder,
  upload.single("image"),
  userController.updateUser,
);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;
