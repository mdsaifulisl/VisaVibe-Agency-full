const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const upload = require("../middleware/uploadMiddleware");

// ১. ইমেজ ফোল্ডার সেট করার মিডলওয়্যার
const setDestinationFolder = (req, res, next) => {
  req.uploadFolder = "Destination_Image";
  next();
};

// সব ডেস্টিনেশন পাওয়ার জন্য 
router.get("/", destinationController.getAllDestinations);

// নির্দিষ্ট একটি ডেস্টিনেশন পাওয়ার জন্য
router.get("/:id", destinationController.getDestinationById);

// নতুন ডেস্টিনেশন তৈরি করার জন্য (ফোল্ডার সেটআপ + ইমেজ আপলোডসহ)
router.post("/", setDestinationFolder, upload.array("images", 10), destinationController.createDestination,);

// ডেস্টিনেশন আপডেট করার জন্য
router.put("/:id", setDestinationFolder, upload.array("images", 10), destinationController.updateDestination,);

// ডেস্টিনেশন ডিলিট করার জন্য
router.delete("/:id", destinationController.deleteDestination);

module.exports = router;
