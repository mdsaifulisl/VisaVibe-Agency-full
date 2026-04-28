const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");
const upload = require("../middleware/uploadMiddleware"); 

const setSliderFolder = (req, res, next) => {
    req.uploadFolder = 'Slider_Image'; 
    next();
};

// all sliders 
router.get("/", sliderController.getAllSliders);

// single slider by id
router.get("/:id", sliderController.getSliderById);

// create new slider with image upload
router.post("/", setSliderFolder, upload.single("image"), sliderController.createSlider);

// update slider with image upload
router.put("/:id", setSliderFolder, upload.single("image"), sliderController.updateSlider);

// delete slider by id
router.delete("/:id", sliderController.deleteSlider);

module.exports = router;
